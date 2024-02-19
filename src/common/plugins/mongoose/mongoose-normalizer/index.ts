import * as mongoose from "mongoose";
import * as objliteralUtils from "src/common/utils/datatype/object-literal-utils";

export const defaultPluginOptions = {
  shouldNormalizeId: true,
  shouldRemoveVersionKey: true,
  shouldRemovePrivatePaths: true,
  normalizeOnQuery: true,
  normalizeOnToJSON: true,
  normalizeOnToObject: true,
};

export type PluginOptions = Partial<typeof defaultPluginOptions>;
type SchemaDocToTransform = Record<string, any>;

const doUnNormalizeId = (inObject?: Record<string, any>) => {
  const isUndefinedOrNull = (value: any) => {
    return typeof value === "undefined" || value === null;
  };

  if (
    inObject &&
    !isUndefinedOrNull(inObject.id) &&
    typeof inObject._id === "undefined"
  ) {
    inObject._id = inObject.id;
    delete inObject.id;
  }
};

const doNormalizeId = (inObject: SchemaDocToTransform) => {
  if (inObject._id?.toString && typeof inObject.id === "undefined") {
    const id = inObject._id.toString();
    inObject = { id, ...inObject };
    delete inObject._id;
  }

  // TODO: Look into why this results in a RangeError while called by toObject
  // try {
  //   console.log("/log/ docInDb: ", docInDb);
  // } catch (error: any) {
  //   console.log(error);
  //   console.log("/error/ transformingDoc -", error.name, error.message);
  // }
};

const doRemoveVersionKey = (inObject: SchemaDocToTransform) => {
  if (typeof inObject.__v !== "undefined") {
    delete inObject.__v;
  }
};

const doRemovePrivatePaths = (
  docInDb: mongoose.HydratedDocument<any>,
  docToTransform: SchemaDocToTransform
) => {
  for (const path in docInDb.paths) {
    if (docInDb.paths[path]?.options?.private) {
      if (typeof docToTransform[path] !== "undefined") {
        delete docToTransform[path];
      }
    }
  }
};

const applyIdNormalizationHook = <Schema extends mongoose.Schema>(
  schema: Schema
) => {
  const documentHookOperationRegExp =
    /^[validate|save|remove|updateOne|deleteOne|init]$/;

  const aggregateHookOperationRegExp = /^aggregate$/;
  const modelHookOperationRegExp = /^insertMany$/;
  const queryHookOperationRegExp = /^[count|delete|find|replace|update].*$/;

  // this === document
  // called first before saving a document.
  schema.pre(new RegExp(/^[remove].*$/), async function () {
    console.log('this (remove) :', this);
    console.log("\nDocument (remove) hook\n");
  });

  schema.pre(new RegExp(queryHookOperationRegExp), async function (next) {
    console.log("query hook");
    console.log("this (query hook): ", this);

    const nextAsFacade = (...args: any[]) => undefined;
    const nextMiddleware = typeof next === "function" ? next : nextAsFacade;

    // const {
    //   _fields = {},
    //   _userProvidedFields = {},
    //   _conditions = {},
    //   ...doc
    // } = (this as any) || {};

    // console.log('this: ', this as any);

    // console.log(
    //   "/log/ sup: ",
    //   " fields: ",
    //   _fields,
    //   " usrProvidedFiels: ",
    //   _userProvidedFields,
    //   " conditions: ",
    //   _conditions,
    //   " doc: ", doc
    // );

    // doUnNormalizeId(doc);
    // doUnNormalizeId(_fields);
    // doUnNormalizeId(_userProvidedFields);
    // doUnNormalizeId(_conditions);

    // console.log('\nthis (second): ', this as any);

    // console.log(
    //   "/log/ sup (after): ",
    //   " fields: ",
    //   _fields,
    //   " usrProvidedFiels: ",
    //   _userProvidedFields,
    //   " conditions: ",
    //   _conditions,
    //   " doc: ", doc
    // );

    nextMiddleware();
  });

  schema.pre(new RegExp(modelHookOperationRegExp), async function (next) {
    console.log("model hook");
    console.log("model hook (this): ", this);
  });

  schema.pre("init", async function (next) {
    console.log("document hook");
    console.log("doc hook (this): ", this);
  });

  schema.pre(new RegExp(aggregateHookOperationRegExp), async function (next) {
    console.log("aggregate hook");
    console.log("aggregate hook (this): ", this);
  });
};

const makeDocTransformer = <
  DocumentInDb extends mongoose.HydratedDocumentFromSchema<any>,
  SchemaTransformOptions extends mongoose.SchemaTypeOptions<any>
>(
  pluginOptions: PluginOptions
) => {
  return (
    docInDb: DocumentInDb,
    docToTransform: SchemaDocToTransform,
    schemaTransformOptions: SchemaTransformOptions
  ) => {
    console.log("transforming doc: ", docToTransform);

    // if (pluginOptions.shouldNormalizeId) {
    //   doNormalizeId(docToTransform);
    // }

    // if (pluginOptions.shouldRemovePrivatePaths) {
    //   doRemovePrivatePaths(docInDb, docToTransform);
    // }

    // if (pluginOptions.shouldRemoveVersionKey) {
    //   doRemoveVersionKey(docToTransform);
    // }

    return docToTransform;
  };
};

export const mongooseNormalizer = <Schema extends mongoose.Schema>(
  schema: Schema,
  options: PluginOptions = {}
) => {
  const pluginOptions = { ...defaultPluginOptions, ...options };

  if (pluginOptions.normalizeOnToObject) {
    const desiredToObject = schema.get("toObject") || {};
    const pluginToObject = {
      transform: makeDocTransformer<
        mongoose.HydratedDocumentFromSchema<Schema>,
        mongoose.SchemaTypeOptions<Schema>
      >(pluginOptions),
    };

    schema.set("toObject", {
      ...pluginToObject,
      ...desiredToObject,
    });
  }

  if (pluginOptions.normalizeOnToJSON) {
    const desiredToJSON = schema.get("toJSON") || {};
    const pluginToJSON = {
      transform: makeDocTransformer<
        mongoose.HydratedDocumentFromSchema<Schema>,
        mongoose.SchemaTypeOptions<Schema>
      >(pluginOptions),
    };

    schema.set("toJSON", {
      ...pluginToJSON,
      ...desiredToJSON,
    });
  }

  if (pluginOptions.normalizeOnQuery) {
    if (pluginOptions.shouldNormalizeId) {
      applyIdNormalizationHook(schema);
    }
  }
};
