import { ExecutionEnvironment } from '@/types/executor';
import * as cheerio from 'cheerio';
import { ExtractTextFromElementTask } from '../task/ExtractTextFromElement';

export async function ExtractTextFromElementExecutor(
  environment: ExecutionEnvironment<typeof ExtractTextFromElementTask>
): Promise<boolean> {
  try {
    const selector = environment.getInput('Selector');
    if (!selector) {
      environment.log.error('selector not defined');
      return false;
    }
    const html = environment.getInput('Html');
    if (!html) {
      environment.log.error('html not defined');
      return false;
    }

    const $ = cheerio.load(html);
    const element = $(selector);

    if (!element) {
      environment.log.error('element not found');
      return false;
    }

    const extractedtext = $.text(element);
    if (!extractedtext) {
      environment.log.error('element has no text');
      return false;
    }

    environment.setOutput('Extract text', extractedtext);

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
