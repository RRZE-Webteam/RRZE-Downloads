window.wp = window.wp || {};

(function ($) {

    var media = wp.media;

    media.view.AttachmentFilters.Taxonomy = media.view.AttachmentFilters.extend({
        tagName: 'select',
        createFilters: function () {
            var filters = {};
            var that = this;

            _.each(that.options.termList || {}, function (term, key) {
                var term_id = term['term_id'];
                var term_name = $("<div/>").html(term['term_name']).text();
                filters[ term_id ] = {
                    text: term_name,
                    priority: key + 2
                };
                filters[term_id]['props'] = {};
                filters[term_id]['props'][that.options.taxonomy] = term_id;
            });

            filters.all = {
                text: that.options.termListTitle,
                priority: 1
            };
            filters['all']['props'] = {};
            filters['all']['props'][that.options.taxonomy] = null;

            this.filters = filters;
        }
    });

    var curAttachmentsBrowser = media.view.AttachmentsBrowser;

    media.view.AttachmentsBrowser = media.view.AttachmentsBrowser.extend({
        createToolbar: function () {
            curAttachmentsBrowser.prototype.createToolbar.apply(this, arguments);
            
            var filters = this.options.filters;
            var that = this;
            
            if (window.attachment_category) {
                $.each(attachment_category || {}, function (taxonomy, values) {
                    if (values.term_list && filters) {
                        that.toolbar.set(taxonomy + '-filter', new media.view.AttachmentFilters.Taxonomy({
                            controller: that.controller,
                            model: that.collection.props,
                            priority: -80,
                            taxonomy: taxonomy,
                            termList: values.term_list,
                            termListTitle: values.list_title,
                            className: 'media-categories-filter attachment-' + taxonomy + '-filter'
                        }).render());
                    }
                });
            }
            
            if (window.attachment_document) {
                $.each(attachment_document || {}, function (taxonomy, values) {
                    if (values.term_list && filters) {
                        that.toolbar.set(taxonomy + '-filter', new media.view.AttachmentFilters.Taxonomy({
                            controller: that.controller,
                            model: that.collection.props,
                            priority: -80,
                            taxonomy: taxonomy,
                            termList: values.term_list,
                            termListTitle: values.list_title,
                            className: 'media-categories-filter attachment-' + taxonomy + '-filter'
                        }).render());
                    }
                });
            }
            
            if (window.attachment_tags) {
                $.each(attachment_tags || {}, function (taxonomy, values) {
                    if (values.term_list && filters) {
                        that.toolbar.set(taxonomy + '-filter', new media.view.AttachmentFilters.Taxonomy({
                            controller: that.controller,
                            model: that.collection.props,
                            priority: -80,
                            taxonomy: taxonomy,
                            termList: values.term_list,
                            termListTitle: values.list_title,
                            className: 'media-categories-filter attachment-' + taxonomy + '-filter'
                        }).render());
                    }
                });
            }
        }
    });

})(jQuery);