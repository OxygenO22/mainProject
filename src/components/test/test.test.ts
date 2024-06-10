test('', () => {
  let man = {
    name: 'Dimych',
    age: 32,
    lessons: [{title: '1'}, {title: '2'}]
  }

  const age = man.age;

  expect(age).toBe(32);
})