'use strict';
class LS {
  exist = false;

  clearHw03() {
    localStorage.removeItem('hw03products');
  }

  getAllProducts() {
    return JSON.parse(localStorage.getItem('hw03products'));
  }

  getProductById(i) {
    const prod = this.getAllProducts();
    // console.log(prod);
    return prod.filter((e) => +e.id === +i)[0];
  }

  setCurrentProduct(p) {
    localStorage.setItem('CurrentProduct', p);
  }

  addReview(e) {
    const rev = e.target?.previousElementSibling.value.trim();
    if (rev) {
      const data = this.getAllProducts();
      const pid = localStorage.getItem('CurrentProduct');
      const prod = data.filter((e) => +e.id === +pid)[0];
      console.log(prod);
      prod.reviews.push({ id: Date.now(), text: rev });
      console.log(prod);
      this.saveLocalData(data);
      location.href = './index.html';
    } else {
      document.querySelector('.error').textContent = 'You need to enter a review !';
      setTimeout(() => {
        document.querySelector('.error').textContent = '';
      }, 2000);
    }
  }

  removeReview(pid, rid) {
    // console.log(pid, rid);
    const data = this.getAllProducts();
    const prod = data.filter((e) => +e.id === +pid)[0];

    const revid = prod.reviews.findIndex((r) => +r.id === +rid);
    console.log(revid);
    prod.reviews.splice(revid, 1);
    this.saveLocalData(data);
  }

  addProduct(e) {
    const prod = e.target?.previousElementSibling.value.trim();
    if (prod) {
        const newProd = {id: Date.now(), product: prod, reviews: [] }
        const data = this.getAllProducts();
        data.push(newProd);
        this.saveLocalData(data);
        location.href = './index.html';
    } else {
      document.querySelector('.error').textContent = 'You need to enter a product name!';
      setTimeout(() => {
        document.querySelector('.error').textContent = '';
      }, 2000);
    }
  }

  saveLocalData(data) {
    localStorage.setItem('hw03products', JSON.stringify(data));
  }

  clearCurrentProduct() {
    localStorage.removeItem('CurrentProduct');
  }

  constructor() {
    // console.log(localStorage);
    // console.log(localStorage.getItem('hw03products'));
    // console.log(JSON.parse(localStorage.getItem('hw03products')));
    JSON.parse(localStorage.getItem('hw03products')) ? (this.exist = true) : (this.exist = false);
  }
}
