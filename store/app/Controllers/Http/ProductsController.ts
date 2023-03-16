import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'


export default class ProductsController {

    public async store({ request, response }: HttpContextContract) {
        const body = request.body()
        const product = await Product.create(body)

        response.status(201)

        return {
            message: "Product created successfully",
            data: product,
        }
    }

    public async index() {
        try {
            const product = await Product.query().orderBy('expirationDate', 'asc');
            return {
                data: product
            }
        } catch (error) {
            return {
                error: true,
            }
        }

    }

    public async show({ params, response }: HttpContextContract) {
        try {
            const product = await Product.findOrFail(params.id)
            
            response.status
            return {

                data: product
            }
        }
        catch (error) {
            return response.status(404).json({
                error: true,
                message: 'Product not find',
            });
        }
    }
    public async destroy({ params }: HttpContextContract) {

        try {
            const product = await Product.findOrFail(params.id)

            await product.delete()

            return {
                message: "Product deleted successfully",
                data: product
            }
        }

        catch (error) {
            return {
                error: true,
                massage: "it is not possible to delete the product"
            }
        }
    }
    public async update({ params, request }: HttpContextContract) {
        try {
            const body = request.body()

            const product = await Product.findOrFail(params.id)

            product.name = body.name
            product.price = body.price
            product.expirationDate = body.expirationDate

            await product.save()

            return {
                massage: "Product updated successfully",
                data: product

            }
        } catch (error) {
            return{
                error: true,
                massage: "it is not possible to update this product"
            }
        }

    }
}
