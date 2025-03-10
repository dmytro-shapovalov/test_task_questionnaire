import fs from 'fs';
import path from 'path';
import { type Plugin } from 'vite';
import { zodToJsonSchema } from 'zod-to-json-schema';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore This file is related to main project, but is used also for vite plugin.
import { questionnaireConfigFileSchema } from '../src/components/Questionnaire/types';

function zodToJsonSchemaPlugin(): Plugin {
  return {
    name: 'vite-plugin-zod-to-json-schema',
    buildEnd() {
      try {
        const jsonSchema = zodToJsonSchema(questionnaireConfigFileSchema);

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
