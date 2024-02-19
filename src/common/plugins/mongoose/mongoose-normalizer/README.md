
## INTRO
This Plugin shouldn't disrupt the default responsibility and expectations
of the "_id" field from a model/schema/document perspective. 

<br> ______ Don't get it? Expect the "_id" property presence, responsibility and ability like you normally would without the plugin being attached.

The "id" field provided by this plugin is specifically for the consumers of a model (utilizing-this-plugin), to visually see and technically work with the "id" field like they would have, with the "_id" field.


## NOTE - for Typescript Implementors

Models are expected to adhere to the facade of the persence of an "id" field on a document. Thus, the need for them to provide an "id" field/property in their Document type-representation (types/interface).

<br> ______ Don't get it? Make sure to include an "id" property in your document interface/types, because thats what consumers of your model will be expecting and receiving, not an "_id" property :)