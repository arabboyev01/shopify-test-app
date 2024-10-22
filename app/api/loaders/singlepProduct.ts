import { singleProductQuery } from "../schemas/schemas";

export const singleProduct = async (request: Request, authenticate: unknown, productId: string) => {
    try {
        const { admin } = await (authenticate as any).admin(request)

        if (admin) {
            // const url = new URL(request.url);
            // const productId = url.searchParams.get('id')

            if (!productId) {
                throw new Error('Product ID is required.')
            }

            const response = await admin.graphql(singleProductQuery, { id: productId })

            if (!response.ok) {
                throw new Error(`Failed to fetch product: ${response.statusText}`)
            }

            const data: any = await response.json()

            return { product: data?.data?.product }
        } else {
            throw new Error('Admin authentication failed.')
        }
    } catch (error) {
        return { error: (error as Error).message || 'An unexpected error occurred.' }
    }
}