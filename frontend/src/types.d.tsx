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
  min: number,
  max: number,
  createdAt: Date
}

type Product = {
  id: null | string,
  owner: null | string,
  name: string,
  description: string,
  price: number,
  ingredients: ProductIngredient[]
}

type ProductIngredient = {
  id: string,
  name: string,
  description: string,
  value: number,
}