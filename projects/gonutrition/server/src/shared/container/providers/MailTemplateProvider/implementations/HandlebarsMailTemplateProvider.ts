import handlebars from 'handlebars';

import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';
import IMailTemplateProvider from '../models/IMailTemplateProvider';

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
  public async parse({ 
   temaplete,
   variables,
  }: IParseMailTemplateDTO): Promise<string>{
    const parseTemplate = handlebars.compile(temaplete);

    return parseTemplate(variables);
 }
}

export default HandlebarsMailTemplateProvider;
