from mongoengine import Document, StringField, IntField, ListField

class User(Document):
    """
    User model for storing user data
    """
    userId = StringField(required=True, unique=True, max_length=100)
    score = IntField(default=0, min_value=0)
    rank = IntField(default=0, min_value=0)
    completedChallenges = ListField(StringField(), default=[])
    
    meta = {
        'collection': 'users'
    }
    
    def to_dict(self):
        """Convert user object to dictionary"""
        return {
            'userId': self.userId,
            'score': self.score,
            'rank': self.rank,
            'completedChallenges': self.completedChallenges
        }
    
    def __str__(self):
        return f"User(userId={self.userId}, score={self.score}, rank={self.rank})" 