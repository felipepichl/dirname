import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';
import IMailTemplateProvider from '../models/IMailTemplateProvider';

class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse({ 
   temaplete,
  }: IParseMailTemplateDTO): Promise<string>{
    return temaplete
 }
}

export default FakeMailTemplateProvider;
