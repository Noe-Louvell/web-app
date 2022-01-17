import axios from "axios";

const getCategorieQuery = `
query{ 
	bonbons{
    data{
      attributes{
        name, 
        price, 
        description, 
        image{
          data{
            attributes{
              name, 
              url
            }
          }
        }
      }
    }
  }
}
`;

export function getBonbons() {
    return axios({
        url: 'http://localhost:1337/graphql',
        method: 'post',
        data: {
            query: getCategorieQuery
        }
    })
}

export function getBonbon(name: string) {
    return axios({
        url: 'http://localhost:1337/graphql',
        method: 'post',
        data: {
            query: `query{
                bonbons(filters: {name: {eq: "${name}"}}
                ){
                  data{
                    attributes{
                      name,
                      price,
                      description,
                      image{
                        data{
                          attributes{
                            url,
                            name}
                        }
                      }
                    }
                  }
                }
              }`
        }
    })
}