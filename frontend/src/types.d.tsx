type User = {
  id: string,
  name: string,
  email: string,
  role: string,
}

type Ingredient = {
  id: string,
  name: string,
  description: string,
  createdAt: Date
}

type Product = {
  id: string,
  owned: null | string,
  name: string,
  description: string,
  price: number,
  ingredients: [
    { id: string, name: string, description: string, value: number, min: number, max: number }
  ]
}