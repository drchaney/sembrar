export async function getAllProductsAPI(){
  const APIURL = "http://localhost:4000/api/products"
  try {
    const response = await fetch(APIURL)
    const results = await response.json();
    return results;
  } catch(error) {
    console.error (error);
  }
}