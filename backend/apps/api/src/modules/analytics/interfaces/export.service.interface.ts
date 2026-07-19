export interface IExportService {
  exportToCSV(data: any[], filename: string): Promise<Buffer>;
  exportToExcel(data: any[], filename: string): Promise<Buffer>;
  exportToPDF(data: any[], filename: string): Promise<Buffer>;
  streamExport(data: any[], format: string, filename: string): Promise<void>;
}
