window.Route_ = class Route_ {
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
                  this.onSuccess(response.data);
                  resolve(response.data);
                })
                .catch(error => {
                    this.onFail(error.response);
                    reject(error.response);
                });
        });
    }

    /*
        Handle a successful form submittion.
    */
    onSuccess(data){
        // this.reset();
        $('.loading-button').button('reset');
        if(window.debug_) console.log(data);
    }
    /*
     Handle a failed form submittion.
     */
    onFail(errors){
        this.errors.record(errors);
        $('.loading-button').button('reset');
        if(window.debug_) console.log(errors);
        if(errors.status == '404'){
          window.location.href = '/user/not-found';
        }
    }
}
