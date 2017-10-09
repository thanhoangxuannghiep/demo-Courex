window.Form_ = class Form_ {
    constructor(data){
        this.originalData = data;
        this.errors = new Errors_();

        for(let field in data){
            this[field] = data[field];
        }
    }
    reset(){
        for (let field in this.originalData ){
            this[field] = '';
        }
        this.errors.clear();
    }

    data(){

        let data = {};

        for (let property in this.originalData){
            data[property] = this[property];
        }

        /*let data = Object.assign({}, this);
        delete data.originalData;
        delete data.errors;*/
        return data;
    }

    get(url){
        return this.onSubmmit('get', url);
    }

    post(url){
        return this.onSubmmit('post', url);
    }

    patch(url){
        return this.onSubmmit('patch', url);
    }

    put(url){
        return this.onSubmmit('put', url);
    }

    delete(url){
        return this.onSubmmit('delete', url);
    }

    onSubmmit(requestType, url){
        $('.loading-button').button('loading');
        return new Promise((resolve,reject)=>{
            axios[requestType](url, this.data())
                .then(response => {
                    if(response.data.redirect){
                      window.location.href = response.data.redirect;
                    }else{
                      this.onSuccess(response.data);
                      resolve(response.data);
                    }
                })
                .catch(error => {
                    this.onFail(error.response.data);
                    reject(error.response.data);
                });
        });
    }

    /*
        Handle a successful form submittion.
    */
    onSuccess(data){
        if (data.reset) {
            this.reset();
        }
        $('.loading-button').button('reset');
        if(window.debug_) console.log(data);
    }
    /*
     Handle a failed form submittion.
     */
    onFail(errors){
        $('.loading-button').button('reset');
        if(window.debug_){
          console.log(errors);
        }
        this.errors.record(errors);
        if(errors.status == '404'){
          window.location.href = '/not-found';
        }
    }
}
