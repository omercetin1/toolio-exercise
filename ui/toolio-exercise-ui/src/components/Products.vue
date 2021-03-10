<template>
  <v-app id="inspire">


    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col
            cols="12"
            sm="12"
          >
            <v-sheet
              rounded="lg"
              min-height="90vh"
            >
              <v-form>
                <v-container>
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      v-model="keyword"
                      label="Keyword"
                      @click:append="filterProducts"
                      filled
                      hide-details
                      append-icon="mdi-checkbox-marked-circle"
                    ></v-text-field>
                  </v-col>
                </v-container>
              </v-form>
              <v-card
                class="mx-auto"
                tile
              >
                <v-list flat>
                  <v-subheader>Products</v-subheader>
                  <v-list-item-group>
                    <v-list-item
                      v-for="(product, i) in products"
                      :key="i"
                    >
                      <v-list-item-content>
                        <v-list-item-title v-text="product.id"></v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-content>
                        <v-list-item-title v-text="product.title"></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-card>
              <div class="text-center align-self-end">
                <v-pagination
                  v-model="page"
                  :length="pageCount"
                  @input="handlePageChange"
                ></v-pagination>
              </div>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import axios from 'axios';
  const ENDPOINT = 'http://localhost:3000/';

  export default {
    data: () => ({
      keyword: '',
      searchedKeyword: '',
      products: [],
      productCount: 0,
      pageCount: 1,
      pageSize: 8,
      links: [
        'Products'
      ],
      page: 1
    }),
    methods: {
      filterProducts() {
        this.searchedKeyword = this.keyword
        axios
          .get(ENDPOINT + 'productCount/' + this.searchedKeyword)
          .then(response => {
            this.productCount = response.data;
            this.pageCount = Math.ceil(Number(this.productCount) / this.pageSize);
          });
        axios
          .get(ENDPOINT + 'products/' + this.searchedKeyword + '/' + this.pageSize + '/' + this.page)
          .then(response => {
            this.products = response.data;
          });
      },
      handlePageChange() {
        if (this.searchedKeyword) {
          axios
            .get(ENDPOINT + 'products/' + this.searchedKeyword + '/' + this.pageSize + '/' + this.page)
            .then(response => {
              this.products = response.data;
            });
        } else {
          axios
            .get(ENDPOINT + 'products/' + this.pageSize + '/' + this.page)
            .then(response => {
              this.products = response.data;
            });
        }
      }
    },
    mounted () {
      axios
        .get(ENDPOINT + 'productCount')
        .then(response => {
          this.productCount = response.data;
          this.pageCount = Math.ceil(Number(this.productCount) / this.pageSize);
        });
      axios
        .get(ENDPOINT + 'products/'+ this.pageSize + '/' + this.page)
        .then(response => {
          this.products = response.data;
        });
    }
    
  }
</script>