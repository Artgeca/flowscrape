import { ExecutionEnvironment } from '@/types/executor';
import * as cheerio from 'cheerio';
import { ExtractTextFromElementTask } from '../task/ExtractTextFromElement';

export async function ExtractTextFromElementExecutor(
  environment: ExecutionEnvironment<typeof ExtractTextFromElementTask>
): Promise<boolean> {
  try {
    const selector = environment.getInput('Selector');
    if (!selector) {
      console.error('Selector not defined');
      return false;
    }
    const html = environment.getInput('Html');
    if (!html) {
      console.error('Html not defined');
      return false;
    }

    const $ = cheerio.load(html);
    const element = $(selector);

    if (!element) {
      console.error('Element not found');
      return false;
    }

    const extractedtext = $.text(element);
    if (!extractedtext) {
      console.error('Element has no text');
      return false;
    }

    environment.setOutput('Extract text', extractedtext);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}