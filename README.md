## Simple JSON Schema
Array Type
==
```json
    {
        "type": "array",
        "itemClasses": [{"type": "string"}]
    }
```

Any Type
==
```json
    {
        "type": "any"
    }
```

Boolean Type
==
```json
    {
        "type": "boolean"
    }
```

Number Type
==
```json
    {
        "type": "number"
    }
```

String Type
==
```json
    {
        "type": "string"
    }
```

Date Type
==
```json
    {
        "type": "date"
    }
```

Class Type 
==
The "vehicle" property is a mixed type property.
```json
    {
        "type": "class",
        "name": "Person",
        "extends":{
            "class": "reference",
            "name": "Homosapian",
            "version": "1.0.0",
            "package":"lds"
        },
        "label": "Person",
        "description": "Human",
        "version": "1.0.1",
        "decorators": [{"name": "person"}],
        "properties": [
            {
                "class": {
                    "type": "string"
                },
                "name": "firstName",
                "label": "First Name"
            },
            {
                "class": "string",
                "name": "lastName",
                "label": "Last Name"
            },
            {
                "class": {
                    "type": "reference",
                    "name": "Person",
                    "package": "lds",
                    "version": "1.0.1"
                },
                "name": "spouse",
                "label": "Spouse"
            },
            {
                "class": {
                    "type": "array",
                    "embedded":true,
                    "itemClasses":[{
                        "type": "reference",
                        "name": "Person",
                        "package":"lds",
                        "version": "1.0.1"
                    }]
                },
                "name": "children",
                "label": "Children",
                "description": "Young ones."
            },
            { 
                "class": [{
                    "type": "reference",
                    "name": "Car",
                    "package":"lds",
                    "version": "1.0.0"
                },
                {
                    "type": "reference",
                    "name": "Truck",
                    "package":"lds",
                    "version": "2.0.4"
                }],
                "name": "vehicle",
                "label": "Vehicle"
            },
            {
                "class": "string",
                "name": "email",
                "decorators":[{
                    "name": "rich-text",
                    "config": {
                        "validHosts": ["gmail", "yahoo"]
                    }
                }]
            }
        ]
    }
```

Reference Type
==
```json
    {
        "type": "reference",
        "name": "Person",
        "version": "1.0.1"
    }
```

Value Type
==
Value Long Hand
```json
    {
        "type": "value",
        "class": {
            "type": "string"
        },
        "value": "Text"
    }
```

Value Short Hand
```json
    {
        "type": "value",
        "class": "string",
        "value": "Text"
    }
```

Value Complex Type
```json
    {
        "type": "value",
        "class": {
            "type": "reference",
            "name": "Person",
            "version": "1.0.1"
        },
        "value": {
            "firstName": "John",
            "lastName": "Doe"
        }
    }
```

Enum Type
==
```json
    {
        "type": "enum",
        "options": [
            {
                "class": { 
                    "type": "string" 
                },
                "name": "STRING",
                "label": "String",
                "value": "This is a String"
            },
            {
                "class": "number",
                "name": "NUMBER",
                "label": "Number",
                "value": 1
            },
            {
                "class": {
                    "type": "reference",
                    "name": "Person",
                    "version": "1.0.1"
                },
                "name": "PERSON",
                "label": "Person",
                "value": {
                    "firstName": "John",
                    "lastName": "Doe"
                }
            }
        ]
    }
```

Workflows
===

```json
{
    "type": "workflow",
    "name": "development",
    "label": "Development",
    "states": [
        {
            "name": "backlog",
            "label": "Back Log",
            "options": [
                "inprogress"
            ],
            "permissions": ["roleName"]
        },
        {
            "name": "inprogress",
            "label": "In Progress",
            "options": [
                "qa",
                "backlog"
            ],
            "permissions":[]
        },
        {
            "name": "qa",
            "label": "QA",
            "options": [
                "publish",
                "inprogress"
            ],
            "permissions":[]
        },
        {
            "name": "publish",
            "label": "Publish",
            "options": [
                "qa",
                "inprogress"
            ],
            "permissions": []
        }
    ]
}
```

Service Actions & Workflows Linking
===

```json
{
    {
        "type": "workflow-action",
        "workflow": {
            "name": "development",
            "state": "inprogress"
        },
        "service":{
            "name": "translation",
            "action": {
                "name": "translate",
                "label": "Translate"
            }
        }
    }
}
```

Registered Service
===

```json 
{
    "type":"service",
    "name":"translation",
    "url": "https://translation.lds.org/",
    "actions": [
        {
            "name": "translate",
            "config": [
                {
                    "class":"string",
                    "name": "message",
                    "label": "Message"
                }
            ]
        }
    ],
    "events": ["assetAdded", "assetRemoved", "assetUpdated"]
}
```

Actions
===
Actions are ways to communicate with services, and receive responses. Services can also send statuses based on the action invocation guids. This will be useful for many reasons. The service is sent a lock guid on the function call. If the service returns lock equal to true, then the asset will be locked until the function returns its value. Function guids are also used to make changes to the document. This is the only way to make changes is if you have the lock id.

Function invocation


```json
{
    "id":"ef99ls-s99ddk-sk239",
    "name": "translate",
    "arguments": [
        {
            "message":"Please translate this!"
        }
    ],
    "asset": {
        "id": "43dd-44-9852k-3423432",
        "lockId":"443l-dlsdk-3lk3l-laekd",
        "type": "content"
    }
}
```

When registering a service the cms will return a guid so that the service can update its status, functions, and unregister. The only other place that services can be forgotten is with an admin. 

Retrieve an asset.
```
/asset/content/guid RUD

/asset/content/type/version/ query and page content.
/asset/content/type/version/guid/collectionName query nested collection
/asset/content/type/version/guid/propertyObject

/asset/image/guid CRUD
/asset/audio/guid CRUD
/asset/video/guid CRUD
/asset/pdf/guid CRUD // Extend type if needed

/asset/guid  // This will send the source of any file content or file.

/model CRUD  NOTE: Maybe categorize models.
/workflow CRUD

/function/invoke 
/function/response // Send response ok and errors here with invocation id.
/service/register
/service/unregister

/activity returns your activity on the CMS.
```

All Assets need to have a revision number on them so when services update the asset they need to have the most recent version.