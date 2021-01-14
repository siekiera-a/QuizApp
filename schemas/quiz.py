# Example
#
# {
#     author: string,
#     description: string,
#     data: {
#         question: string,
#         answers: {
#           text: string,
#           correct: boolean
#         }[]
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
                        'minItems': 2,
                        'items': {
                            'type': 'object',
                            'properties': {
                                'text': {
                                    'type': 'string',
                                    'minLength': 1
                                },
                                'correct': {
                                    'type': 'boolean'
                                }
                            },
                            'required': ['text', 'correct']
                        },
                        'uniqueItems': True
                    }
                },
                'required': ['question', 'answers']
            },
            'minItems': 1,
            'uniqueItems': True
        }
    },
    'required': ['author', 'description', 'data']
}
