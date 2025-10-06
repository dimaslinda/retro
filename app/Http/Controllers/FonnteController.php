<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Worksheet\PageSetup;

class FonnteController extends Controller
{
    public function sendSlfChecklist(Request $request)
    {
        $validated = $request->validate([
            'target' => ['required', 'regex:/^62\d{8,15}$/'],
            'service' => ['required', 'string'],
            'items' => ['required', 'array'],
            'items.*' => ['required', 'string'],
            'checklist' => ['required', 'array'],
            'checklist.*.status' => ['required', 'in:tersedia,tidak'],
            'checklist.*.keterangan' => ['nullable', 'string'],
            'client' => ['required', 'array'],
            'client.nama' => ['required', 'string', 'max:100'],
            'client.instansi' => ['required', 'string', 'max:150'],
            'client.lokasi' => ['required', 'string', 'max:150'],
            'client.luas' => ['required', 'numeric', 'min:1'],
            'client.lantai' => ['required', 'integer', 'min:1'],
            'previewMessage' => ['nullable', 'string'],
        ]);

        $target = $validated['target'];
        $items = $validated['items'];
        $checklist = $validated['checklist'];

        // Ambil data klien dari payload jika ada
        $client = $request->input('client', []);
        $nama = trim((string)($client['nama'] ?? ''));
        $instansi = trim((string)($client['instansi'] ?? ''));
        $lokasi = trim((string)($client['lokasi'] ?? ''));
        $luas = trim((string)($client['luas'] ?? ''));
        $lantai = trim((string)($client['lantai'] ?? ''));

        // Pesan data lengkap untuk nomor kedua (CS) tanpa checklist, sertakan nomor WhatsApp dan layanan
        $service = $validated['service'] ?? $request->input('service', '');
        $lines = [];
        $lines[] = "Data Klien Permohonan SLF 2025";
        $lines[] = "";
        $lines[] = 'Data Klien:';
        if ($nama !== '') $lines[] = "- Nama: $nama";
        if ($instansi !== '') $lines[] = "- Instansi: $instansi";
        if ($lokasi !== '') $lines[] = "- Lokasi/Daerah: $lokasi";
        if ($luas !== '') $lines[] = "- Luas Bangunan: $luas";
        if ($lantai !== '') $lines[] = "- Jumlah Lantai: $lantai";
        if (!empty($service)) $lines[] = "- Layanan: $service";
        if (!empty($target)) $lines[] = "- No WhatsApp: $target";
        $lines[] = "";
        $dataMessage = implode("\n", $lines);

        // Pesan untuk nomor pertama (klien) hanya ucapan terima kasih
        $thankYouMessage = 'terima kasih sudah mengisi checklist kelengkapan dokumen, kami akan kirimkan surat penawaran harga dalam waktu 1x24 jam.';

        // Bangun file Excel dari template, isi dengan data form
        $excelUrl = null;
        $excelError = null;
        try {
            // Gunakan format Excel kustom tanpa template
            $spreadsheet = new Spreadsheet();
            $sheet = $spreadsheet->getActiveSheet();
            $sheet->setTitle('Checklist SLF 2025');

            // Tambahkan sheet baru untuk data pengajuan (agar template tetap utuh)
            $sheet = $spreadsheet->createSheet();
            $sheet->setTitle('Data Pengajuan');

            // Tulis ringkasan data klien
            $row = 1;
            $sheet->setCellValue('A' . $row, 'Data Klien');
            $row += 2;
            $sheet->setCellValue('A' . $row, 'Nama');
            $sheet->setCellValue('B' . $row, $nama);
            $row++;
            $sheet->setCellValue('A' . $row, 'Instansi');
            $sheet->setCellValue('B' . $row, $instansi);
            $row++;
            $sheet->setCellValue('A' . $row, 'Lokasi/Daerah');
            $sheet->setCellValue('B' . $row, $lokasi);
            $row++;
            $sheet->setCellValue('A' . $row, 'Luas Bangunan');
            $sheet->setCellValue('B' . $row, $luas);
            $row++;
            $sheet->setCellValue('A' . $row, 'Jumlah Lantai');
            $sheet->setCellValue('B' . $row, $lantai);

            // Header checklist
            $row += 2;
            $headerRow = $row;
            $sheet->setCellValue('A' . $headerRow, 'No');
            $sheet->setCellValue('B' . $headerRow, 'Kelengkapan Dokumen');
            $sheet->setCellValue('C' . $headerRow, 'Status');
            $sheet->setCellValue('D' . $headerRow, 'Keterangan');
            $row = $headerRow + 1;

            // Isi checklist
            foreach ($items as $i => $item) {
                $status = $checklist[$i]['status'] ?? '';
                $ket = trim((string)($checklist[$i]['keterangan'] ?? ''));
                $sheet->setCellValue('A' . $row, $i + 1);
                $sheet->setCellValue('B' . $row, $item);
                $sheet->setCellValue('C' . $row, $status === 'tersedia' ? 'Tersedia' : ($status === 'tidak' ? 'Tidak' : 'Belum diisi'));
                $sheet->setCellValue('D' . $row, $ket);
                $row++;
            }

            // === Styling agar rapi tanpa mengubah template ===
            $dataStartRow = $headerRow + 1;
            $dataEndRow = $row - 1;

            // Judul dan blok data klien
            $sheet->getStyle('A1')->getFont()->setBold(true)->setSize(12);
            $sheet->getStyle('A3:A7')->getFont()->setBold(true);
            $sheet->getStyle('A3:B7')->getBorders()->getAllBorders()->setBorderStyle(Border::BORDER_THIN);

            // Header tabel
            $sheet->getStyle("A{$headerRow}:D{$headerRow}")->getFont()->setBold(true);
            $sheet->getStyle("A{$headerRow}:D{$headerRow}")->getFill()->setFillType(Fill::FILL_SOLID)->getStartColor()->setRGB('F2F2F2');
            $sheet->getStyle("A{$headerRow}:D{$headerRow}")->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER)->setVertical(Alignment::VERTICAL_CENTER);
            $sheet->getRowDimension($headerRow)->setRowHeight(22);

            // Border seluruh tabel
            if ($dataEndRow >= $dataStartRow) {
                $sheet->getStyle("A{$headerRow}:D{$dataEndRow}")->getBorders()->getAllBorders()->setBorderStyle(Border::BORDER_THIN);
            }

            // Alignment kolom
            if ($dataEndRow >= $dataStartRow) {
                $sheet->getStyle("A{$dataStartRow}:A{$dataEndRow}")->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
                $sheet->getStyle("C{$dataStartRow}:C{$dataEndRow}")->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
                $sheet->getStyle("B{$dataStartRow}:B{$dataEndRow}")->getAlignment()->setWrapText(true);
                $sheet->getStyle("D{$dataStartRow}:D{$dataEndRow}")->getAlignment()->setWrapText(true);
                // Format angka untuk kolom No (dua digit)
                $sheet->getStyle("A{$dataStartRow}:A{$dataEndRow}")->getNumberFormat()->setFormatCode('00');
            }

            // Auto-size kolom
            foreach (['A', 'B', 'C', 'D'] as $col) {
                $sheet->getColumnDimension($col)->setAutoSize(true);
            }

            // Freeze pane pada baris data (menyisakan header tetap terlihat)
            $sheet->freezePane('A' . $dataStartRow);

            // AutoFilter untuk seluruh range data
            if ($dataEndRow >= $headerRow) {
                $sheet->setAutoFilter("A{$headerRow}:D{$dataEndRow}");
            }

            // Print area dan margin halaman
            $sheet->getPageSetup()->setOrientation(PageSetup::ORIENTATION_PORTRAIT);
            // Perbaiki konstanta ukuran kertas ke PAPERSIZE_A4
            $sheet->getPageSetup()->setPaperSize(PageSetup::PAPERSIZE_A4);
            $sheet->getPageSetup()->setFitToWidth(1);
            $sheet->getPageSetup()->setFitToHeight(0);
            $sheet->getPageSetup()->setPrintArea("A1:D{$dataEndRow}");
            $sheet->getPageMargins()->setTop(0.5)->setBottom(0.5)->setLeft(0.4)->setRight(0.4);

            // Simpan file ke folder public/exports agar dapat diakses lewat URL
            $exportDir = public_path('exports');
            if (!is_dir($exportDir)) {
                if (!@mkdir($exportDir, 0775, true) && !is_dir($exportDir)) {
                    throw new \RuntimeException('Gagal membuat folder ekspor: ' . $exportDir);
                }
            }
            $filename = 'SLF-Checklist-' . date('Ymd-His') . '-' . Str::random(6) . '.xlsx';
            $filepath = $exportDir . DIRECTORY_SEPARATOR . $filename;
            $writer = new Xlsx($spreadsheet);
            $writer->save($filepath);
            if (!is_file($filepath)) {
                throw new \RuntimeException('Gagal menyimpan file Excel: ' . $filepath);
            }
            $excelUrl = url('exports/' . $filename);

            // Tambahkan tautan file ke pesan data lengkap untuk CS
            if ($excelUrl) {
                $dataMessage .= "\n\nFile Excel: " . $excelUrl;
            }
        } catch (\Throwable $e) {
            $excelError = $e->getMessage();
            $dataMessage .= "\n\nCatatan: File Excel gagal dibuat (" . $excelError . ").";
        }

        $token = env('FONNTE_TOKEN');
        if (!$token) {
            return response()->json(['message' => 'Konfigurasi Fonnte token tidak ditemukan.'], 500);
        }

        // Normalisasi target utama ke awalan 62
        $targetDigits = preg_replace('/\D+/', '', $target);
        if (Str::startsWith($targetDigits, '0')) {
            $targetDigits = '62' . substr($targetDigits, 1);
        } elseif (Str::startsWith($targetDigits, '8')) {
            $targetDigits = '62' . $targetDigits;
        }

        // Kirim ke Fonnte (target utama / klien) dengan pesan terima kasih
        $primaryResponse = Http::asForm()
            ->withHeaders(['Authorization' => $token])
            ->post('https://api.fonnte.com/send', [
                'target' => $targetDigits,
                'message' => $thankYouMessage,
                'countryCode' => '62',
                'typing' => false,
                'delay' => '0',
                'preview' => true,
            ]);

        // Kirim juga ke target kedua (CS) dengan pesan data lengkap
        $secondaryTarget = env('FONNTE_TARGET_SECONDARY');
        $secondaryResponse = null;
        if ($secondaryTarget) {
            $secondaryDigits = preg_replace('/\D+/', '', $secondaryTarget);
            if (Str::startsWith($secondaryDigits, '0')) {
                $secondaryDigits = '62' . substr($secondaryDigits, 1);
            } elseif (Str::startsWith($secondaryDigits, '8')) {
                $secondaryDigits = '62' . $secondaryDigits;
            }

            $secondaryResponse = Http::asForm()
                ->withHeaders(['Authorization' => $token])
                ->post('https://api.fonnte.com/send', [
                    'target' => $secondaryDigits,
                    'message' => $dataMessage,
                    'countryCode' => '62',
                    'typing' => false,
                    'delay' => '0',
                    'preview' => true,
                ]);
        }

        return response()->json([
            'message' => 'Proses pengiriman selesai',
            'primary_success' => $primaryResponse->successful(),
            'secondary_success' => $secondaryResponse ? $secondaryResponse->successful() : null,
            'fonnte_primary' => $primaryResponse->json(),
            'fonnte_secondary' => $secondaryResponse ? $secondaryResponse->json() : null,
            'excel_url' => $excelUrl,
            'excel_error' => $excelError,
        ]);
    }

    public function sendPbgChecklist(Request $request)
    {
        $validated = $request->validate([
            'target' => ['required', 'regex:/^62\d{8,15}$/'],
            'service' => ['required', 'string'],
            'items' => ['required', 'array'],
            'items.*' => ['required', 'string'],
            'checklist' => ['required', 'array'],
            'checklist.*.status' => ['required', 'in:tersedia,tidak'],
            'checklist.*.keterangan' => ['nullable', 'string'],
            'client' => ['required', 'array'],
            'client.nama' => ['required', 'string', 'max:100'],
            'client.instansi' => ['required', 'string', 'max:150'],
            'client.lokasi' => ['required', 'string', 'max:150'],
            'client.luas' => ['required', 'numeric', 'min:1'],
            'client.lantai' => ['required', 'integer', 'min:1'],
            'previewMessage' => ['nullable', 'string'],
        ]);

        $target = $validated['target'];
        $items = $validated['items'];
        $checklist = $validated['checklist'];

        // Ambil data klien dari payload jika ada
        $client = $request->input('client', []);
        $nama = trim((string)($client['nama'] ?? ''));
        $instansi = trim((string)($client['instansi'] ?? ''));
        $lokasi = trim((string)($client['lokasi'] ?? ''));
        $luas = trim((string)($client['luas'] ?? ''));
        $lantai = trim((string)($client['lantai'] ?? ''));

        // Pesan data lengkap untuk nomor kedua (CS) tanpa checklist, sertakan nomor WhatsApp dan layanan
        $service = $validated['service'] ?? $request->input('service', '');
        $lines = [];
        $lines[] = "Data Klien Permohonan PBG 2025";
        $lines[] = "";
        $lines[] = 'Data Klien:';
        if ($nama !== '') $lines[] = "- Nama: $nama";
        if ($instansi !== '') $lines[] = "- Instansi: $instansi";
        if ($lokasi !== '') $lines[] = "- Lokasi/Daerah: $lokasi";
        if ($luas !== '') $lines[] = "- Luas Bangunan: $luas";
        if ($lantai !== '') $lines[] = "- Jumlah Lantai: $lantai";
        if (!empty($service)) $lines[] = "- Layanan: $service";
        if (!empty($target)) $lines[] = "- No WhatsApp: $target";
        $lines[] = "";
        $dataMessage = implode("\n", $lines);

        // Pesan untuk nomor pertama (klien) hanya ucapan terima kasih
        $thankYouMessage = 'terima kasih sudah mengisi checklist kelengkapan dokumen, kami akan kirimkan surat penawaran harga dalam waktu 1x24 jam.';

        // Bangun file Excel dari template, isi dengan data form
        $excelUrl = null;
        $excelError = null;
        try {
            // Gunakan format Excel kustom tanpa template
            $spreadsheet = new Spreadsheet();
            $sheet = $spreadsheet->getActiveSheet();
            $sheet->setTitle('Checklist PBG 2025');

            // Tambahkan sheet baru untuk data pengajuan (agar template tetap utuh)
            $sheet = $spreadsheet->createSheet();
            $sheet->setTitle('Data Pengajuan');

            // Tulis ringkasan data klien
            $row = 1;
            $sheet->setCellValue('A' . $row, 'Data Klien');
            $row += 2;
            $sheet->setCellValue('A' . $row, 'Nama');
            $sheet->setCellValue('B' . $row, $nama);
            $row++;
            $sheet->setCellValue('A' . $row, 'Instansi');
            $sheet->setCellValue('B' . $row, $instansi);
            $row++;
            $sheet->setCellValue('A' . $row, 'Lokasi/Daerah');
            $sheet->setCellValue('B' . $row, $lokasi);
            $row++;
            $sheet->setCellValue('A' . $row, 'Luas Bangunan');
            $sheet->setCellValue('B' . $row, $luas);
            $row++;
            $sheet->setCellValue('A' . $row, 'Jumlah Lantai');
            $sheet->setCellValue('B' . $row, $lantai);

            // Header checklist
            $row += 2;
            $headerRow = $row;
            $sheet->setCellValue('A' . $headerRow, 'No');
            $sheet->setCellValue('B' . $headerRow, 'Kelengkapan Dokumen');
            $sheet->setCellValue('C' . $headerRow, 'Status');
            $sheet->setCellValue('D' . $headerRow, 'Keterangan');
            $row = $headerRow + 1;

            // Isi checklist
            foreach ($items as $i => $item) {
                $status = $checklist[$i]['status'] ?? '';
                $ket = trim((string)($checklist[$i]['keterangan'] ?? ''));
                $sheet->setCellValue('A' . $row, $i + 1);
                $sheet->setCellValue('B' . $row, $item);
                $sheet->setCellValue('C' . $row, $status === 'tersedia' ? 'Tersedia' : ($status === 'tidak' ? 'Tidak' : 'Belum diisi'));
                $sheet->setCellValue('D' . $row, $ket);
                $row++;
            }

            // === Styling agar rapi tanpa mengubah template ===
            $dataStartRow = $headerRow + 1;
            $dataEndRow = $row - 1;

            // Judul dan blok data klien
            $sheet->getStyle('A1')->getFont()->setBold(true)->setSize(12);
            $sheet->getStyle('A3:A7')->getFont()->setBold(true);
            $sheet->getStyle('A3:B7')->getBorders()->getAllBorders()->setBorderStyle(Border::BORDER_THIN);

            // Header tabel
            $sheet->getStyle("A{$headerRow}:D{$headerRow}")->getFont()->setBold(true);
            $sheet->getStyle("A{$headerRow}:D{$headerRow}")->getFill()->setFillType(Fill::FILL_SOLID)->getStartColor()->setRGB('F2F2F2');
            $sheet->getStyle("A{$headerRow}:D{$headerRow}")->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER)->setVertical(Alignment::VERTICAL_CENTER);
            $sheet->getRowDimension($headerRow)->setRowHeight(22);

            // Border seluruh tabel
            if ($dataEndRow >= $dataStartRow) {
                $sheet->getStyle("A{$headerRow}:D{$dataEndRow}")->getBorders()->getAllBorders()->setBorderStyle(Border::BORDER_THIN);
            }

            // Alignment kolom
            if ($dataEndRow >= $dataStartRow) {
                $sheet->getStyle("A{$dataStartRow}:A{$dataEndRow}")->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
                $sheet->getStyle("C{$dataStartRow}:C{$dataEndRow}")->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
                $sheet->getStyle("B{$dataStartRow}:B{$dataEndRow}")->getAlignment()->setWrapText(true);
                $sheet->getStyle("D{$dataStartRow}:D{$dataEndRow}")->getAlignment()->setWrapText(true);
                // Format angka untuk kolom No (dua digit)
                $sheet->getStyle("A{$dataStartRow}:A{$dataEndRow}")->getNumberFormat()->setFormatCode('00');
            }

            // Auto-size kolom
            foreach (['A', 'B', 'C', 'D'] as $col) {
                $sheet->getColumnDimension($col)->setAutoSize(true);
            }

            // Freeze pane pada baris data (menyisakan header tetap terlihat)
            $sheet->freezePane('A' . $dataStartRow);

            // AutoFilter untuk seluruh range data
            if ($dataEndRow >= $headerRow) {
                $sheet->setAutoFilter("A{$headerRow}:D{$dataEndRow}");
            }

            // Print area dan margin halaman
            $sheet->getPageSetup()->setOrientation(PageSetup::ORIENTATION_PORTRAIT);
            $sheet->getPageSetup()->setPaperSize(PageSetup::PAPERSIZE_A4);
            $sheet->getPageSetup()->setFitToWidth(1);
            $sheet->getPageSetup()->setFitToHeight(0);
            $sheet->getPageSetup()->setPrintArea("A1:D{$dataEndRow}");
            $sheet->getPageMargins()->setTop(0.5)->setBottom(0.5)->setLeft(0.4)->setRight(0.4);

            // Simpan file ke folder public/exports agar dapat diakses lewat URL
            $exportDir = public_path('exports');
            if (!is_dir($exportDir)) {
                if (!@mkdir($exportDir, 0775, true) && !is_dir($exportDir)) {
                    throw new \RuntimeException('Gagal membuat folder ekspor: ' . $exportDir);
                }
            }
            $filename = 'PBG-Checklist-' . date('Ymd-His') . '-' . Str::random(6) . '.xlsx';
            $filepath = $exportDir . DIRECTORY_SEPARATOR . $filename;
            $writer = new Xlsx($spreadsheet);
            $writer->save($filepath);
            if (!is_file($filepath)) {
                throw new \RuntimeException('Gagal menyimpan file Excel: ' . $filepath);
            }
            $excelUrl = url('exports/' . $filename);

            // Tambahkan tautan file ke pesan data lengkap untuk CS
            if ($excelUrl) {
                $dataMessage .= "\n\nFile Excel: " . $excelUrl;
            }
        } catch (\Throwable $e) {
            $excelError = $e->getMessage();
            $dataMessage .= "\n\nCatatan: File Excel gagal dibuat (" . $excelError . ").";
        }

        $token = env('FONNTE_TOKEN');
        if (!$token) {
            return response()->json(['message' => 'Konfigurasi Fonnte token tidak ditemukan.'], 500);
        }

        // Normalisasi target utama ke awalan 62
        $targetDigits = preg_replace('/\D+/', '', $target);
        if (Str::startsWith($targetDigits, '0')) {
            $targetDigits = '62' . substr($targetDigits, 1);
        } elseif (Str::startsWith($targetDigits, '8')) {
            $targetDigits = '62' . $targetDigits;
        }

        // Kirim ke Fonnte (target utama / klien) dengan pesan terima kasih
        $primaryResponse = Http::asForm()
            ->withHeaders(['Authorization' => $token])
            ->post('https://api.fonnte.com/send', [
                'target' => $targetDigits,
                'message' => $thankYouMessage,
                'countryCode' => '62',
                'typing' => false,
                'delay' => '0',
                'preview' => true,
            ]);

        // Kirim juga ke target kedua (CS) dengan pesan data lengkap
        $secondaryTarget = env('FONNTE_TARGET_SECONDARY');
        $secondaryResponse = null;
        if ($secondaryTarget) {
            $secondaryDigits = preg_replace('/\D+/', '', $secondaryTarget);
            if (Str::startsWith($secondaryDigits, '0')) {
                $secondaryDigits = '62' . substr($secondaryDigits, 1);
            } elseif (Str::startsWith($secondaryDigits, '8')) {
                $secondaryDigits = '62' . $secondaryDigits;
            }

            $secondaryResponse = Http::asForm()
                ->withHeaders(['Authorization' => $token])
                ->post('https://api.fonnte.com/send', [
                    'target' => $secondaryDigits,
                    'message' => $dataMessage,
                    'countryCode' => '62',
                    'typing' => false,
                    'delay' => '0',
                    'preview' => true,
                ]);
        }

        return response()->json([
            'message' => 'Proses pengiriman selesai',
            'primary_success' => $primaryResponse->successful(),
            'secondary_success' => $secondaryResponse ? $secondaryResponse->successful() : null,
            'fonnte_primary' => $primaryResponse->json(),
            'fonnte_secondary' => $secondaryResponse ? $secondaryResponse->json() : null,
            'excel_url' => $excelUrl,
            'excel_error' => $excelError,
        ]);
    }
}
