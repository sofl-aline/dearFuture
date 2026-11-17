
export type Capsule = {
  id: string
  title: string
  message: string
  createdAt: string
  opensAt: string
}

export type NewCapsule = Pick<Capsule, 'title' | 'message' | 'opensAt'>

