
App.factory('McommerceCart', function($rootScope, $http, httpCache, Url) {

    var factory = {};

    factory.value_id = null;

    factory.find = function() {

        if(!this.value_id) return;

        return $http({
            method: 'GET',
            url: Url.get("mcommerce/mobile_cart/find", {value_id: this.value_id}),
            cache: false,
            responseType:'json'
        });
    };
    
    factory.addProduct = function (form) {

        if (!this.value_id) return;

        var url = Url.get("mcommerce/mobile_cart/add", {value_id: this.value_id});
        
        var data = {form: form};

        return $http.post(url, data).success(function() {
            httpCache.remove(Url.get("mcommerce/mobile_cart/find", {value_id: this.value_id}));
        });
    };


    factory.adddiscount = function (discount_code) {

        if (!this.value_id) return;

        //if no discount added, it's valid
        if(discount_code.length === 0) return true;

        var url = Url.get("mcommerce/mobile_cart/adddiscount", {value_id: this.value_id});

        var data = {discount_code: discount_code};

        return $http.post(url, data);
    };

    factory.addTip = function (cart) {

        if (!this.value_id) return;

        var url = Url.get("mcommerce/mobile_cart/addtip", {value_id: this.value_id});

        var data = {tip: cart.tip ? cart.tip : 0};

        return $http.post(url, data).success(function() {
            httpCache.remove(Url.get("mcommerce/mobile_cart/find", {value_id: this.value_id}));
        });
    };

    factory.compute = function () {

        if (!this.value_id) return;

        var url = Url.get("mcommerce/mobile_cart/compute", {value_id: this.value_id});

        var data = {};

        return $http.post(url, data).success(function(results) {
            httpCache.remove(Url.get("mcommerce/mobile_cart/find", {value_id: this.value_id}));
        });
    };

    factory.deleteLine = function (line_id) {

        if (!this.value_id) return;
        
        if (!line_id) return;

        var url = Url.get("mcommerce/mobile_cart/delete", {value_id: this.value_id, line_id: line_id});
        
        var data = {};
        
        return $http.delete(url, data);
                                          
    };

    factory.modifyLine = function (line) {

        if (!this.value_id) return;

        return $http({
            method: 'POST',
            data: {line_id: line.id, qty : line.qty, format: line.format},
            url: Url.get("mcommerce/mobile_cart/modify"),
            cache: false,
            responseType:'json'
        });

    };

    factory.useFidelityPoints = function(points) {
        if (!this.value_id) return;

        return $http({
            method: 'POST',
            data: {points: points},
            url: Url.get("mcommerce/mobile_cart/usefidelitypointsforcart"),
            cache: false,
            responseType:'json'
        });
    };

    factory.removeAllDiscount = function() {
        if (!this.value_id) return;

        return $http({
            method: 'POST',
            url: Url.get("mcommerce/mobile_cart/removealldiscount"),
            cache: false,
            responseType:'json'
        });
    };

    return factory;
});
