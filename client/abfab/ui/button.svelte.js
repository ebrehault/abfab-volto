/* generated by Svelte v3.38.3 */
import {
	SvelteComponent,
	append,
	attr,
	binding_callbacks,
	bubble,
	check_outros,
	create_component,
	create_slot,
	destroy_component,
	detach,
	element,
	group_outros,
	init,
	insert,
	listen,
	mount_component,
	safe_not_equal,
	space,
	toggle_class,
	transition_in,
	transition_out,
	update_slot
} from "/~/libs/svelte/internal/index.mjs";

import AFIcon from "/~/abfab/ui/icon.svelte";

function create_if_block(ctx) {
	let aficon;
	let current;

	aficon = new AFIcon({
			props: {
				size: /*size*/ ctx[1],
				icon: /*icon*/ ctx[0]
			}
		});

	return {
		c() {
			create_component(aficon.$$.fragment);
		},
		m(target, anchor) {
			mount_component(aficon, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const aficon_changes = {};
			if (dirty & /*size*/ 2) aficon_changes.size = /*size*/ ctx[1];
			if (dirty & /*icon*/ 1) aficon_changes.icon = /*icon*/ ctx[0];
			aficon.$set(aficon_changes);
		},
		i(local) {
			if (current) return;
			transition_in(aficon.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(aficon.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(aficon, detaching);
		}
	};
}

function create_fragment(ctx) {
	let button;
	let span1;
	let t;
	let span0;
	let button_class_value;
	let button_aria_label_value;
	let current;
	let mounted;
	let dispose;
	let if_block = /*icon*/ ctx[0] && create_if_block(ctx);
	const default_slot_template = /*#slots*/ ctx[9].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[8], null);

	return {
		c() {
			button = element("button");
			span1 = element("span");
			if (if_block) if_block.c();
			t = space();
			span0 = element("span");
			if (default_slot) default_slot.c();
			attr(span0, "class", "pa-button-label");
			toggle_class(span0, "pa-sr-only", !!/*icon*/ ctx[0]);
			attr(span1, "tabindex", "-1");
			attr(span1, "class", "pa-button-wrapper");
			attr(button, "class", button_class_value = "pa-button pa-" + /*size*/ ctx[1] + " pa-" + /*kind*/ ctx[3] + " pa-" + /*aspect*/ ctx[2]);
			attr(button, "type", /*type*/ ctx[6]);
			attr(button, "aria-label", button_aria_label_value = /*label*/ ctx[7] ? /*label*/ ctx[7].textContent : "");
			attr(button, "tabindex", "0");
			button.disabled = /*disabled*/ ctx[5];
			toggle_class(button, "pa-active", /*active*/ ctx[4]);
			toggle_class(button, "pa-button-icon", /*icon*/ ctx[0]);
		},
		m(target, anchor) {
			insert(target, button, anchor);
			append(button, span1);
			if (if_block) if_block.m(span1, null);
			append(span1, t);
			append(span1, span0);

			if (default_slot) {
				default_slot.m(span0, null);
			}

			/*span0_binding*/ ctx[11](span0);
			current = true;

			if (!mounted) {
				dispose = listen(button, "click", /*click_handler*/ ctx[10]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (/*icon*/ ctx[0]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*icon*/ 1) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(span1, t);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}

			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 256)) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[8], !current ? -1 : dirty, null, null);
				}
			}

			if (dirty & /*icon*/ 1) {
				toggle_class(span0, "pa-sr-only", !!/*icon*/ ctx[0]);
			}

			if (!current || dirty & /*size, kind, aspect*/ 14 && button_class_value !== (button_class_value = "pa-button pa-" + /*size*/ ctx[1] + " pa-" + /*kind*/ ctx[3] + " pa-" + /*aspect*/ ctx[2])) {
				attr(button, "class", button_class_value);
			}

			if (!current || dirty & /*type*/ 64) {
				attr(button, "type", /*type*/ ctx[6]);
			}

			if (!current || dirty & /*label*/ 128 && button_aria_label_value !== (button_aria_label_value = /*label*/ ctx[7] ? /*label*/ ctx[7].textContent : "")) {
				attr(button, "aria-label", button_aria_label_value);
			}

			if (!current || dirty & /*disabled*/ 32) {
				button.disabled = /*disabled*/ ctx[5];
			}

			if (dirty & /*size, kind, aspect, active*/ 30) {
				toggle_class(button, "pa-active", /*active*/ ctx[4]);
			}

			if (dirty & /*size, kind, aspect, icon*/ 15) {
				toggle_class(button, "pa-button-icon", /*icon*/ ctx[0]);
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(button);
			if (if_block) if_block.d();
			if (default_slot) default_slot.d(detaching);
			/*span0_binding*/ ctx[11](null);
			mounted = false;
			dispose();
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	let { icon } = $$props;
	let { size = "medium" } = $$props; // small, medium, large
	let { aspect = "solid" } = $$props; // solid or basic
	let { kind = "secondary" } = $$props; // primary, secondary, destructive
	let { active = false } = $$props;
	let { disabled = false } = $$props;
	let { type = "button" } = $$props;
	let label;

	function click_handler(event) {
		bubble.call(this, $$self, event);
	}

	function span0_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			label = $$value;
			$$invalidate(7, label);
		});
	}

	$$self.$$set = $$props => {
		if ("icon" in $$props) $$invalidate(0, icon = $$props.icon);
		if ("size" in $$props) $$invalidate(1, size = $$props.size);
		if ("aspect" in $$props) $$invalidate(2, aspect = $$props.aspect);
		if ("kind" in $$props) $$invalidate(3, kind = $$props.kind);
		if ("active" in $$props) $$invalidate(4, active = $$props.active);
		if ("disabled" in $$props) $$invalidate(5, disabled = $$props.disabled);
		if ("type" in $$props) $$invalidate(6, type = $$props.type);
		if ("$$scope" in $$props) $$invalidate(8, $$scope = $$props.$$scope);
	};

	return [
		icon,
		size,
		aspect,
		kind,
		active,
		disabled,
		type,
		label,
		$$scope,
		slots,
		click_handler,
		span0_binding
	];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance, create_fragment, safe_not_equal, {
			icon: 0,
			size: 1,
			aspect: 2,
			kind: 3,
			active: 4,
			disabled: 5,
			type: 6
		});
	}
}

export default Component;