import { productsSchema } from '../schemas/schemas'

export const products = async (request: Request, authenticate: unknown) => {
    try {
        const { admin } = await (authenticate as any).admin(request)
        if (admin) {
            const response = await admin.graphql(productsSchema)
            if (!response.ok) {
                throw new Error(`Failed to fetch products: ${response.statusText}`)
            }

            const data: any = await response.json()

            return { products: data?.data?.products?.edges }
        } else {
            throw new Error('Admin authentication failed.')
        }
    } catch (error: unknown) {
        return { error: (error as Error).message || "An unexpected error occurred." }
    }
}