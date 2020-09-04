import {
    ApolloClient,
    InMemoryCache,
    gql,
    NormalizedCacheObject,
    ApolloQueryResult,
    createHttpLink,
    DefaultOptions
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Item } from "../type/type";
const token = localStorage.getItem("token");
const defaultOptions: DefaultOptions = {
    watchQuery: {
        fetchPolicy: "no-cache",
        errorPolicy: "ignore"
    },
    query: {
        fetchPolicy: "no-cache",
        errorPolicy: "all"
    }
};
const httpLink = createHttpLink({
    uri: "/graphql"
});
const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ""
        }
    };
});
const client: ApolloClient<NormalizedCacheObject> = token
    ? new ApolloClient({
          link: authLink.concat(httpLink),
          uri: "/graphql",
          defaultOptions: defaultOptions,
          cache: new InMemoryCache()
      })
    : new ApolloClient({
          uri: "/graphql",
          defaultOptions: defaultOptions,
          cache: new InMemoryCache()
      });
export async function items(page?: number): Promise<ApolloQueryResult<any>> {
    return client.query({
        query: gql`
            query {
                items(page: ${page ? page : 1}) {
                    data {
                        author {
                            username
                        }
                        id
                        item_name
                        description
                        price
                        type
                        counter
                        view
                        minecraft_item_shorthand
                    }
                    paginatorInfo {
                        count
                        total
                        currentPage
                        hasMorePages
                        lastItem
                        lastPage
                        perPage
                        firstItem
                    }
                }
            }
        `
    });
}
export async function item(id: number): Promise<ApolloQueryResult<any>> {
    return client.query({
        query: gql`
            query {
                item(id: ${id}) {
                    author {
                        username
                    }
                    id
                    item_name
                    description
                    price
                    type
                    counter
                    view
                    minecraft_item_shorthand
                    review{
                            author{
                                username
                            }
                            score
                            content
                            caption
                            created_at
                            updated_at
                        }
                }
            }
        `
    });
}
export async function posts(): Promise<ApolloQueryResult<any>> {
    return client.query({
        query: gql`
            query {
                posts {
                    data {
                        author {
                            username
                        }
                        content
                        caption
                        comments {
                            author {
                                username
                            }
                            content
                        }
                        reactions {
                            author {
                                username
                            }
                            content
                        }
                        created_at
                        updated_at
                    }
                }
            }
        `
    });
}

export async function systemstatus(): Promise<ApolloQueryResult<any>> {
    return client.query({
        query: gql`
            query {
                SPIGOTStatus {
                    ping
                    online
                    exception
                    updated_at
                }
                MYSQLStatus {
                    ping
                    online
                    exception
                    updated_at
                }
                REDISStatus {
                    ping
                    online
                    exception
                    updated_at
                }
            }
        `
    });
}

export async function addUserCart(amount: number, item_id: number) {
    return client.mutate({
        mutation: gql`
            mutation {
                addUserCart( amount: ${amount}, item_id: ${item_id}) {
                item_id
                amount
                created_at
                updated_at
                }
            }
        `
    });
}
export async function me() {
    return client.query({
        query: gql`
            query {
                me {
                    id
                    username
                    email
                    created_at
                    updated_at
                }
            }
        `
    });
}
export async function meCart(getItemProperty?: boolean) {
    return getItemProperty
        ? client.query({
              query: gql`
                  query {
                      me {
                          usercart {
                              amount
                              item {
                                  item_name
                                  price
                                  minecraft_item_shorthand
                              }
                              item_id
                              created_at
                              updated_at
                          }
                      }
                  }
              `
          })
        : client.query({
              query: gql`
                  query {
                      me {
                          usercart {
                              amount
                              item_id
                              created_at
                              updated_at
                          }
                      }
                  }
              `
          });
}
