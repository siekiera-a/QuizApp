# Example
#
# {
#     user: string,
#     data: [
#         {
#             question: int,  # question id
#             answers: int[]  # answers ids
#         }
#     ]
# }

answer_schema = {
    'type': 'object',
    'properties': {
        'user': {
            'type': 'string',
            'minLength': 1
        },
        'data': {
            'type': 'array',
            'items': {
                'type': 'object',
                'properties': {
                    'question': {
                        'type': 'integer'
                    },
                    'answers': {
                        'type': 'array',
                        'items': {
                            'type': 'integer'
                        },
                        'minItems': 1,
                        'uniqueItems': True
                    }
                },
                'required': ['question', 'answers']
            },
            'minItems': 1,
            'uniqueItems': True
        }
    },
    'required': ['user', 'data']
}
