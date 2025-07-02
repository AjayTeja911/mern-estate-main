import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getRegionalPrices = async (req, res) => {
  try {
    const data = await readFile(path.join(__dirname, '../data/converted_data.csv'), 'utf-8');
    const rows = data.split('\n').map(row => row.split(','));
    const headers = rows[0];
    const jsonData = rows.slice(1).map(row => {
      return headers.reduce((obj, header, index) => {
        obj[header] = row[index];
        return obj;
      }, {});
    });
    res.json(jsonData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};