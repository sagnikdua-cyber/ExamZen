const fs = require('fs');

const dbIds = JSON.parse(fs.readFileSync('db_subjects_ids.json', 'utf8'));
const oldSubjects = JSON.parse(fs.readFileSync('subjects_list.json', 'utf8'));

const newSubjects = dbIds.map(dbSub => {
    const oldSub = oldSubjects.find(os => os.code === dbSub.code);
    return {
        _id: dbSub.id,
        name: dbSub.name,
        code: dbSub.code,
        category: oldSub ? oldSub.category : 'Core',
        semester: oldSub ? oldSub.semester : 1,
        __v: 0
    };
});

fs.writeFileSync('subjects_list.json', JSON.stringify(newSubjects, null, 2));
console.log('Fixed subjects_list.json');
