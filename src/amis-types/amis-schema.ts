import { PageSchema } from "amis/lib/Schema";
import { FormSchema, } from "amis/lib/renderers/Form";
// import { FormSchema, } from "amis/lib/renderers/";
import { AmisBaseSchema, AmisSchemaType } from "@/amis-types/schema-type";

interface AmisPageSchema extends Omit<PageSchema, "type">, AmisBaseSchema {
  type: AmisSchemaType.Page;
}

interface AmisFormSchema extends Omit<FormSchema, "type">, AmisBaseSchema {
  type: AmisSchemaType.Form;
}

type AmisSchema = AmisPageSchema | AmisFormSchema;


export { AmisSchema }
