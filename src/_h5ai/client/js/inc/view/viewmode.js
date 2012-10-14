
modulejs.define('view/viewmode', ['_', '$', 'core/settings', 'core/resource', 'core/store'], function (_, $, allsettings, resource, store) {

	var modes = ['details', 'list', 'grid', 'icons'],

		settings = _.extend({}, {
			modes: modes
		}, allsettings.view),

		storekey = 'h5ai.viewmode',

		template = '<li id="view-[MODE]" class="view">' +
						'<a href="#">' +
							'<img src="' + resource.image('view-[MODE]') + '" alt="view-[MODE]"/>' +
							'<span class="l10n-[MODE]"/>' +
						'</a>' +
					'</li>',

		update = function (viewmode) {

			var $extended = $('#extended');

			viewmode = _.indexOf(settings.modes, viewmode) >= 0 ? viewmode : settings.modes[0];
			store.put(storekey, viewmode);

			_.each(modes, function (mode) {
				if (mode === viewmode) {
					$('#view-' + mode).addClass('current');
					$extended.addClass('view-' + mode).show();
				} else {
					$('#view-' + mode).removeClass('current');
					$extended.removeClass('view-' + mode);
				}
			});
		},

		init = function () {

			var $navbar = $('#navbar');

			settings.modes = _.intersection(settings.modes, modes);

			if (settings.modes.length > 1) {
				_.each(modes.reverse(), function (mode) {
					if (_.indexOf(settings.modes, mode) >= 0) {
						$(template.replace(/\[MODE\]/g, mode))
							.appendTo($navbar)
							.on('click', 'a', function (event) {
								update(mode);
								event.preventDefault();
							});
					}
				});
			}

			update(store.get(storekey));
		};

	init();
});