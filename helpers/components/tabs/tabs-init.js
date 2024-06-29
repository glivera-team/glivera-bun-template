const SELECTORS = {
	tabsTrigger: '.js-section-tab-trigger',
	tabsContent: '.js-section-tab-content',
};
const classNames = {
	tabTriggerClass: 'section__tabs_button',
	tabContentClass: 'section__tabs_content',
};

tabs({
	trigger: SELECTORS.tabsTrigger,
	content: SELECTORS.tabsContent,
	triggerClass: classNames.tabTriggerClass,
	contentClass: classNames.tabContentClass,
});
