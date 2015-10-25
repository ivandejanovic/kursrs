(function(root, Atlas) {
  'use strict';

  // Create app object to serve as namespace.
  var app = root.app || {};
  
  //Extract DOM manipulation library reference.
  var $ = Atlas.$;
  
  //Extract Backbone local storage library reference.
  var Store = root.Store;

  // Set app object to global scope.
  root.app = app;

  // Create exchange model
  app.Exchange = Atlas.Model.extend({
    defaults : {
      'exchange' : 'Menjacnica',
      'sellRate' : 'Prodajni',
      'buyRate' : 'Kupovni',
      'date' : '01-01-1990'
    }
  });

  // Create exchange collection
  app.Exchanges = Atlas.Collection.extend({
    model : app.Exchange
  });

  // Create exchange collections for each currency and set local storage
  app.EurExchanges = app.Exchanges.extend({
    localStorage : new Store('eur')
  });

  app.UsdExchanges = app.Exchanges.extend({
    localStorage : new Store('usd')
  });

  app.ChfExchanges = app.Exchanges.extend({
    localStorage : new Store('chf')
  });

  // Create exchange collections for each currency
  app.eurExchanges = new app.EurExchanges();
  app.usdExchanges = new app.UsdExchanges();
  app.chfExchanges = new app.ChfExchanges();

  // Fetch previously stored data
  app.eurExchanges.fetch();
  app.usdExchanges.fetch();
  app.chfExchanges.fetch();
  
  app.BasicView = Atlas.View.extend({
    el : '#main_container'
  });

  // Create index view
  app.IndexView = app.BasicView.extend({
    template : Atlas.templateFactory('index'),
    events : {
      'click #update' : 'handleUpdateClick'
    },
    clearCollection : function(collection) {
      var model = null;
      var index = 0;

      while (!collection.isEmpty()) {
        model = collection.at(index);
        model.destroy();
      }
    },
    fillCollectionFromArray : function(collection, array) {
      var count = array.length, index;

      for (index = 0; index < count; index += 1) {
        collection.create(array[index]);
      }
    },
    refillCollectionFromArray : function(collection, array) {
      this.clearCollection(collection);
      this.fillCollectionFromArray(collection, array);
    },
    updateDataSuccess : function(data, textStatus, jqXHR) {
      this.refillCollectionFromArray(app.eurExchanges, data.eur);
      this.refillCollectionFromArray(app.usdExchanges, data.usd);
      this.refillCollectionFromArray(app.chfExchanges, data.chf);

      $('#message').html('Podaci uspesno osvezeni.');
    },
    updateDataFail : function(data, textStatus, jqXHR) {
      $('#message').html('Greska pri osvezavanju podataka. Pokusajte ponovo.');
    },
    handleUpdateClick : function() {
      var that = this;

      $.get('http://quineinteractive.com/rest/kursrs/getData')
      .done(function(data, textStatus, jqXHR) {
        that.updateDataSuccess(data, textStatus, jqXHR);
      }).fail(function(data, textStatus, jqXHR) {
        that.updateDataFail(data, textStatus, jqXHR);
      });
    }
  });

  // Create currency view
  app.CurrencyView = app.BasicView.extend({
    template : Atlas.templateFactory('currency'),
    events : {
      'click #backCurrency' : 'handleBackClick'
    },
    serializeData : function (options) {
      return {
        cur: options.cur,
        exchanges: options.exchanges.toJSON()
      };
    }
  });

  // Create instructions view
  app.InstructionsView = app.BasicView.extend({
    template : Atlas.templateFactory('instructions'),
    events : {
      'click #backInstructions' : 'handleBackClick'
    }
  });

  // Create about view
  app.AboutView = app.BasicView.extend({
    template : Atlas.templateFactory('about'),
    events : {
      'click #backAbout' : 'handleBackClick'
    }
  });

  // Create router
  var Router = Atlas.Router.extend({
    routes : {
      '' : 'index',
      'cur_list/:cur' : 'currency',
      'instructions' : 'instructions',
      'about' : 'about'
    },
    initialize : function() {
      this.indexView = new app.IndexView();
      this.currencyView = new app.CurrencyView();
      this.instructionsView = new app.InstructionsView();
      this.aboutView = new app.AboutView();
    },
    index : function() {
      this.indexView.render();
    },
    currency : function(cur) {
      var exchanges = null;

      if (cur === 'EUR') {
        exchanges = app.eurExchanges;
      } else if (cur === 'USD') {
        exchanges = app.usdExchanges;
      } else {
        exchanges = app.chfExchanges;
      }

      this.currencyView.render({'cur': cur, 'exchanges': exchanges});
    },
    instructions : function() {
      this.instructionsView.render();
    },
    about : function() {
      this.aboutView.render();
    }
  });

  app.router = new Router();

  Atlas.history.start();
}(window, window.Atlas));
