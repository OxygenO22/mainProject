const increaseAge = (u: UserType) => {
  u.age++;
}

type UserType = {
  name: string
  age: number
}

test('big test', () => {
  
  const user: UserType = {
    name: 'Alex',
    age: 35
  }
  
  increaseAge(user);

  expect(user.age).toBe(33)
})