const { default: SummaryApi } = require("../common")

const fetchCategoryWiseProduct = async (catagory) => {
    try {
        const response = await fetch(SummaryApi.getCatagorywiseProduct.url, {
            method: SummaryApi.getCatagorywiseProduct.method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                catagory: catagory,
            }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const dataResponse = await response.json();
        //console.log("API Response:", dataResponse);   
        // //it show the catagory poduct 

        // Normalize the response to ensure data is an array
        const normalizedData = Array.isArray(dataResponse.data)
            ? dataResponse.data
            : [dataResponse.data]; // Wrap the object in an array

        return {
            ...dataResponse,
            data: normalizedData,
        };
    } catch (error) {
        console.error("Error fetching category-wise products:", error);
        return { data: [] }; // Return an empty array on error
    }
};

export default fetchCategoryWiseProduct;
