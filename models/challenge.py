from mongoengine import Document, StringField, ListField, DictField

class Challenge(Document):
    """
    Challenge model for storing coding challenges
    """
    id = StringField(required=True, unique=True, max_length=100)
    title = StringField(required=True, max_length=200)
    description = StringField(required=True)
    difficulty = StringField(required=True, choices=['easy', 'medium', 'hard'])
    starterCode = StringField(required=True)
    testCases = ListField(DictField(), required=True)
    
    meta = {
        'collection': 'challenges',
        'indexes': [
            'id',
            'difficulty'
        ]
    }
    
    def to_dict(self):
        """Convert challenge object to dictionary"""
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'difficulty': self.difficulty,
            'starterCode': self.starterCode,
            'testCases': self.testCases
        }
    
    def to_dict_public(self):
        """Convert challenge object to dictionary without test cases (for public endpoints)"""
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'difficulty': self.difficulty,
            'starterCode': self.starterCode
        }
    
    def __str__(self):
        return f"Challenge(id={self.id}, title={self.title}, difficulty={self.difficulty})" 