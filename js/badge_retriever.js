function BadgeManager(options) {
	this.configUrl = options.configUrl;
  this.config = options.config;
  this.badgeIdAttributeName = options.badgeIdAttributeName || 'data-badge';
};

BadgeManager.prototype.getConfig = function(cb) {
    $.ajax({
      url: this.configUrl,
    }).done(function(data) {
      this.config = data;
    });
};

BadgeManager.prototype.init = function(cb) {
    if (!(this.config)) {
      getConfig(this.loadBadges);
    } else {
      this.loadBadges();
    };
};

BadgeManager.prototype.loadBadges = function() {
  var badgeDivs = $('div['+ this.badgeIdAttributeName + ']');
  var self = this;
  badgeDivs.each(function (){
    var badgeDiv = $(this)[0];
    var badgeName = badgeDiv.getAttribute(self.badgeIdAttributeName);
    var badgeHtml = self.getBadgeHtml(badgeName);
    if (badgeHtml) {
      badgeDiv.outerHTML = self.getBadgeHtml(badgeName) + badgeDiv.outerHTML;
    }
  });
};

BadgeManager.prototype.getBadgeHtml = function(badgeName) {
  badge =_.find( this.config.badges, ['name', badgeName]);
  if (!badge) { 
    console.warn("Badge named " + badgeName + " was not found."); 
    return null;
  }
  template = _.find(this.config.templates, ['name', badge.template]);
  return this.fillTemplate(badge, template);
};

BadgeManager.prototype.fillTemplate = function(badge, template) {
  var newTemplate = template.html;
  _.forEach(badge.variables , function(variable, index) {
    newTemplate = newTemplate.replace('${' + index + '}', variable);
  });
  return newTemplate;
};