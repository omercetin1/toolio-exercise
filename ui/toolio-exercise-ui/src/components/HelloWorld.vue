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
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import axios from 'axios';
  export default {
    data: () => ({
      keyword: "",
      products: [],
      links: [
        'Products'
      ],
    }),
    methods: {
      filterProducts() {
        console.log("here");
        axios
          .get('http://localhost:3000/products/' + this.keyword)
          .then(response => {
            this.products = response.data;
          });
      }
    },
    mounted () {
      axios
        .get('http://localhost:3000/products')
        .then(response => {
          this.products = response.data;
        });
    }
    
  }
</script>