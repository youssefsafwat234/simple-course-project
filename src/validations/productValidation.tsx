
interface IProductValidation {
    title: string;
    description: string;
    imageURL: string;
    price: string;
}

//  ==================  Utils ====================
const validUrl = (url: string) => {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
};


export const productValidation = (product: IProductValidation) => {
    const errors: IProductValidation = {
        title: "",
        description: "",
        imageURL: "",
        price: "",
    };

    if (!product.title.trim() || product.title.length < 10 || product.title.length > 100) {
        errors.title = "Title is required and must be between 10 and 100 characters";
    }

    if (!product.description.trim() || product.description.length < 20 || product.description.length > 1000) {
        errors.description = "Description is required and must be between 10 and 1000 characters";
    }


    if (!product.imageURL.trim() || !validUrl(product.imageURL)) {
        errors.imageURL = "Image URL is required and must be a valid URL";
    }

    if (!product.price.trim() || isNaN(Number(product.price)) || Number(product.price) <= 0) {
        errors.price = "Price is required and must be a positive number";
    }

    return errors;
};