import fs from 'fs';
import path from 'path';
import { type Plugin } from 'vite';
import { zodToJsonSchema } from 'zod-to-json-schema';

import { questionnaireSchema } from '../components/Questionnaire/types';

function zodToJsonSchemaPlugin(): Plugin {
  return {
    name: 'vite-plugin-zod-to-json-schema',
    buildEnd() {
      try {
        const jsonSchema = zodToJsonSchema(questionnaireSchema);

        const jsonFilePath = path.resolve(
          'src/components/Questionnaire/configs/schema',
          'questionnaireSchema.json',
        );

        fs.writeFileSync(jsonFilePath, JSON.stringify(jsonSchema, null, 2));
        console.log('JSON schema generated successfully:', jsonFilePath);
      } catch (error) {
        console.error('Error generating JSON schema:', error);
      }
    },
  };
}

export { zodToJsonSchemaPlugin };
