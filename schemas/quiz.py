# Example
#
# {
#     author: string,
#     description: string,
#     data: {
#         question: string,
#         answers: string[]
#     }[]
# }

quiz_schema = {
    'type': 'object',
    'properties': {
        'author': {
            'type': 'string',
            'minLength': 3
        },
        'description': {
            'type': 'string'
        },
        'data': {
            'type': 'array',
            'items': {
                'type': 'object',
                'properties': {
                    'question': {
                        'type': 'string',
                        'minLength': 3,
                    },
                    'answers': {
                        'type': 'array',
                        'minItems': 1,
                        'items': {
                            'type': 'string'
                        },
                        'uniqueItems': True
                    }
                },
                'required': ['question', 'answers']
            },
            'minItems': 1
        }
    },
    'required': ['author', 'description', 'data']
}
