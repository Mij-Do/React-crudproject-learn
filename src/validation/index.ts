/**
 * Validates a product object containing title, price, description, and image URL.
 *
 * @param {Object} product - The product object to validate.
 * @param {string} product.title - The title of the product. Must be between 10 to 80 characters.
 * @param {string} product.price - The price of the product. Must be a valid number.
 * @param {string} product.description - The description of the product. Must be between 10 to 800 characters.
 * @param {string} product.image - The image URL of the product. Must be a valid image link (jpg, png, etc.).
 *
 * @returns {Object} An object containing error messages for each field if validation fails; empty strings otherwise.
 * @returns {string} return.title - Error message for the title field.
 * @returns {string} return.price - Error message for the price field.
 * @returns {string} return.description - Error message for the description field.
 * @returns {string} return.image - Error message for the image field.
 */

export const productValidation = (product: {title: string; price: string; description: string; imageURL: string;}) => {
    const errors: {title: string; price: string; description: string; imageURL: string;} = {
        title: '',
        price: '',
        description: '',
        imageURL: '',
    };

    const validateImage = /^https?:\/\/.*\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i;


    if (!product.title.trim() || product.title.length < 10 || product.title.length > 80) {
        errors.title = 'Product Title must be between 10 to 80 characters!';
    }
    if (!product.description.trim() || product.description.length < 10 || product.description.length > 80) {
        errors.description = 'Product Description must be between 10 to 800 characters!';
    }
    if (!product.imageURL.trim() || !validateImage) {
        errors.imageURL = 'Valid Image URL is Required!';
    }
    if (!product.price.trim() || isNaN(Number(product.price))) {
        errors.price = 'Valid Price is Required!';
    }

    return errors;
}
