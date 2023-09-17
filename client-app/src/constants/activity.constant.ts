const activityActivities = {
    Drink: 'drink',
    Hangout: 'hangout',
    Picnic: 'picnic',
    Travel: 'travel',
    Reading: 'reading',
    English: 'english',
    Creative: 'creative',
    Software: 'software',
    Developer: 'developer'
}

const activityCategoryOptions = [
   {key: activityActivities.Drink, text: 'Drink', value: activityActivities.Drink},
   {key: activityActivities.Hangout, text: 'Hangout', value: activityActivities.Hangout},
   {key: activityActivities.Picnic, text: 'Picnic', value: activityActivities.Picnic},
   {key: activityActivities.Travel, text: 'Travel', value: activityActivities.Travel},
   {key: activityActivities.Reading, text: 'Reading', value: activityActivities.Reading},
   {key: activityActivities.English, text: 'English', value: activityActivities.English},
   {key: activityActivities.Creative, text: 'Creative', value: activityActivities.Creative},
   {key: activityActivities.Software, text: 'Software', value: activityActivities.Software},
   {key: activityActivities.Developer, text: 'Developer', value: activityActivities.Developer},
]

export {
    activityActivities,
    activityCategoryOptions
}