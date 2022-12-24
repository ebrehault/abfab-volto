/* generated by Svelte v3.38.3 */
import {
	SvelteComponent,
	append,
	attr,
	binding_callbacks,
	check_outros,
	component_subscribe,
	create_component,
	destroy_component,
	destroy_each,
	detach,
	element,
	group_outros,
	init,
	insert,
	mount_component,
	safe_not_equal,
	set_data,
	space,
	text,
	toggle_class,
	transition_in,
	transition_out
} from "/~/libs/svelte/internal/index.mjs";

import CodeMirrorEditor from "./codemirror.svelte";
import Viewer from "./viewer.svelte";
import Add from "./add.svelte";
import AFButton from "../ui/button.svelte";
import Toolbar from "./toolbar.svelte";
import Navigation from "./navigation.svelte";
import Properties from "./properties.svelte";
import { showNavigation, loadTree, saveFile } from "./editor.js";
import { AbFabStore, redirectToLogin } from "/~/abfab/core.js";
import { onMount, onDestroy } from "/~/libs/svelte/index.mjs";
import { derived } from "/~/libs/svelte/store/index.mjs";

function add_css() {
	var style = element("style");
	style.id = "svelte-1y2xwr4-style";
	style.textContent = "ul.svelte-1y2xwr4.svelte-1y2xwr4{list-style-type:none;margin:0;padding:0;text-align:center}header.svelte-1y2xwr4.svelte-1y2xwr4{height:2em;display:flex;align-items:center}header.svelte-1y2xwr4 img.svelte-1y2xwr4{height:2em;padding:0.2em;margin-left:0.2em}header.svelte-1y2xwr4 ul.svelte-1y2xwr4{margin-left:auto;margin-right:1em;display:flex}main.svelte-1y2xwr4.svelte-1y2xwr4{display:flex}.editor-container.svelte-1y2xwr4.svelte-1y2xwr4{display:flex;flex-direction:column;height:calc(100vh - 2.5em);width:calc(100vw - 3.5em);margin:0px;padding:0px;overflow:hidden;position:relative}.editor-container.svelte-1y2xwr4 .editor.svelte-1y2xwr4{height:100%}.editor-container.has-error.svelte-1y2xwr4 .editor.svelte-1y2xwr4{height:80%}.editor-container.half.svelte-1y2xwr4.svelte-1y2xwr4{width:50vw}.editor-container.with-nav.svelte-1y2xwr4.svelte-1y2xwr4{width:calc(100vw - 250px)}.editor-container.half.with-nav.svelte-1y2xwr4.svelte-1y2xwr4{width:calc(50vw - 10em)}.errors-container.svelte-1y2xwr4.svelte-1y2xwr4{overflow:auto;position:relative;z-index:10}.errors.svelte-1y2xwr4.svelte-1y2xwr4{height:100%;overflow:auto;font-size:var(--font-size-xs)}.errors.svelte-1y2xwr4 div.svelte-1y2xwr4{color:var(--color-accent-primary-lightest);padding:0.25em}.errors.svelte-1y2xwr4 .error.svelte-1y2xwr4{background-color:var(--color-accent-secondary-dark)}.errors.svelte-1y2xwr4 .warning.svelte-1y2xwr4{background-color:var(--color-accent-secondary-default)}.errors.svelte-1y2xwr4 code.svelte-1y2xwr4{display:block;white-space:pre-wrap;padding:0.25em;margin:0.25em;color:var(--color-neutral-primary-lighter)}.discard-button.svelte-1y2xwr4.svelte-1y2xwr4{position:absolute;top:0;right:0;padding:0.25em}.add-container.svelte-1y2xwr4.svelte-1y2xwr4{position:absolute;width:100%;height:100%;z-index:10;background-color:var(--color-neutral-primary-lightest)}";
	append(document.head, style);
}

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[24] = list[i];
	return child_ctx;
}

// (125:12) <AFButton kind="primary" aspect="basic" icon="check" size="small"                 on:click={triggerSave}>
function create_default_slot_4(ctx) {
	let t;

	return {
		c() {
			t = text("Save");
		},
		m(target, anchor) {
			insert(target, t, anchor);
		},
		d(detaching) {
			if (detaching) detach(t);
		}
	};
}

// (128:8) {#if type !== 'Directory' && play}
function create_if_block_7(ctx) {
	let li;
	let afbutton;
	let current;

	afbutton = new AFButton({
			props: {
				aspect: "basic",
				icon: "refresh",
				size: "small",
				$$slots: { default: [create_default_slot_3] },
				$$scope: { ctx }
			}
		});

	afbutton.$on("click", /*refreshViewer*/ ctx[19]);

	return {
		c() {
			li = element("li");
			create_component(afbutton.$$.fragment);
		},
		m(target, anchor) {
			insert(target, li, anchor);
			mount_component(afbutton, li, null);
			current = true;
		},
		p(ctx, dirty) {
			const afbutton_changes = {};

			if (dirty & /*$$scope*/ 134217728) {
				afbutton_changes.$$scope = { dirty, ctx };
			}

			afbutton.$set(afbutton_changes);
		},
		i(local) {
			if (current) return;
			transition_in(afbutton.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(afbutton.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(li);
			destroy_component(afbutton);
		}
	};
}

// (130:16) <AFButton aspect="basic" icon="refresh" size="small"                     on:click={refreshViewer}>
function create_default_slot_3(ctx) {
	let t;

	return {
		c() {
			t = text("Refresh");
		},
		m(target, anchor) {
			insert(target, t, anchor);
		},
		d(detaching) {
			if (detaching) detach(t);
		}
	};
}

// (134:8) {#if type !== 'Directory'}
function create_if_block_6(ctx) {
	let li;
	let afbutton;
	let current;

	afbutton = new AFButton({
			props: {
				kind: "primary",
				aspect: "basic",
				icon: "play",
				size: "small",
				active: /*play*/ ctx[7],
				$$slots: { default: [create_default_slot_2] },
				$$scope: { ctx }
			}
		});

	afbutton.$on("click", /*togglePlay*/ ctx[14]);

	return {
		c() {
			li = element("li");
			create_component(afbutton.$$.fragment);
		},
		m(target, anchor) {
			insert(target, li, anchor);
			mount_component(afbutton, li, null);
			current = true;
		},
		p(ctx, dirty) {
			const afbutton_changes = {};
			if (dirty & /*play*/ 128) afbutton_changes.active = /*play*/ ctx[7];

			if (dirty & /*$$scope*/ 134217728) {
				afbutton_changes.$$scope = { dirty, ctx };
			}

			afbutton.$set(afbutton_changes);
		},
		i(local) {
			if (current) return;
			transition_in(afbutton.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(afbutton.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(li);
			destroy_component(afbutton);
		}
	};
}

// (136:12) <AFButton kind="primary" aspect="basic" icon="play" size="small" active={play}             on:click={togglePlay}>
function create_default_slot_2(ctx) {
	let t;

	return {
		c() {
			t = text("Play");
		},
		m(target, anchor) {
			insert(target, t, anchor);
		},
		d(detaching) {
			if (detaching) detach(t);
		}
	};
}

// (141:12) <AFButton kind="primary" aspect="basic" icon="info" size="small" active={properties}             on:click={toggleProperties}>
function create_default_slot_1(ctx) {
	let t;

	return {
		c() {
			t = text("Play");
		},
		m(target, anchor) {
			insert(target, t, anchor);
		},
		d(detaching) {
			if (detaching) detach(t);
		}
	};
}

// (148:4) {#if $showNavigation}
function create_if_block_5(ctx) {
	let navigation;
	let current;
	navigation = new Navigation({});

	return {
		c() {
			create_component(navigation.$$.fragment);
		},
		m(target, anchor) {
			mount_component(navigation, target, anchor);
			current = true;
		},
		i(local) {
			if (current) return;
			transition_in(navigation.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(navigation.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(navigation, detaching);
		}
	};
}

// (152:8) {#if type === 'Directory' && mode === 'add'}
function create_if_block_4(ctx) {
	let div;
	let add;
	let current;
	add = new Add({});

	return {
		c() {
			div = element("div");
			create_component(add.$$.fragment);
			attr(div, "class", "add-container svelte-1y2xwr4");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			mount_component(add, div, null);
			current = true;
		},
		i(local) {
			if (current) return;
			transition_in(add.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(add.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(add);
		}
	};
}

// (162:8) {#if hasError }
function create_if_block_2(ctx) {
	let div1;
	let span;
	let afbutton;
	let t0;
	let div0;
	let t1;
	let current;

	afbutton = new AFButton({
			props: {
				aspect: "solid",
				icon: "cross",
				size: "small",
				$$slots: { default: [create_default_slot] },
				$$scope: { ctx }
			}
		});

	afbutton.$on("click", /*discardErrors*/ ctx[18]);
	let if_block = /*error*/ ctx[0] && create_if_block_3(ctx);
	let each_value = /*warnings*/ ctx[1];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	return {
		c() {
			div1 = element("div");
			span = element("span");
			create_component(afbutton.$$.fragment);
			t0 = space();
			div0 = element("div");
			if (if_block) if_block.c();
			t1 = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(span, "class", "discard-button svelte-1y2xwr4");
			attr(div0, "class", "errors svelte-1y2xwr4");
			attr(div1, "class", "errors-container svelte-1y2xwr4");
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, span);
			mount_component(afbutton, span, null);
			append(div1, t0);
			append(div1, div0);
			if (if_block) if_block.m(div0, null);
			append(div0, t1);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div0, null);
			}

			current = true;
		},
		p(ctx, dirty) {
			const afbutton_changes = {};

			if (dirty & /*$$scope*/ 134217728) {
				afbutton_changes.$$scope = { dirty, ctx };
			}

			afbutton.$set(afbutton_changes);

			if (/*error*/ ctx[0]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block_3(ctx);
					if_block.c();
					if_block.m(div0, t1);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			if (dirty & /*warnings*/ 2) {
				each_value = /*warnings*/ ctx[1];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div0, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		i(local) {
			if (current) return;
			transition_in(afbutton.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(afbutton.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div1);
			destroy_component(afbutton);
			if (if_block) if_block.d();
			destroy_each(each_blocks, detaching);
		}
	};
}

// (165:20) <AFButton aspect="solid" icon="cross" size="small"                         on:click={discardErrors}>
function create_default_slot(ctx) {
	let t;

	return {
		c() {
			t = text("Discard");
		},
		m(target, anchor) {
			insert(target, t, anchor);
		},
		d(detaching) {
			if (detaching) detach(t);
		}
	};
}

// (169:20) {#if error}
function create_if_block_3(ctx) {
	let div;
	let t0_value = /*error*/ ctx[0].message + "";
	let t0;
	let code;
	let t1_value = /*error*/ ctx[0].frame + "";
	let t1;

	return {
		c() {
			div = element("div");
			t0 = text(t0_value);
			code = element("code");
			t1 = text(t1_value);
			attr(code, "class", "svelte-1y2xwr4");
			attr(div, "class", "error svelte-1y2xwr4");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, t0);
			append(div, code);
			append(code, t1);
		},
		p(ctx, dirty) {
			if (dirty & /*error*/ 1 && t0_value !== (t0_value = /*error*/ ctx[0].message + "")) set_data(t0, t0_value);
			if (dirty & /*error*/ 1 && t1_value !== (t1_value = /*error*/ ctx[0].frame + "")) set_data(t1, t1_value);
		},
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

// (170:20) {#each warnings as warning}
function create_each_block(ctx) {
	let div;
	let t0_value = /*warning*/ ctx[24].message + "";
	let t0;
	let t1;
	let code;
	let t2_value = /*warning*/ ctx[24].frame + "";
	let t2;
	let t3;

	return {
		c() {
			div = element("div");
			t0 = text(t0_value);
			t1 = space();
			code = element("code");
			t2 = text(t2_value);
			t3 = space();
			attr(code, "class", "svelte-1y2xwr4");
			attr(div, "class", "warning svelte-1y2xwr4");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, t0);
			append(div, t1);
			append(div, code);
			append(code, t2);
			append(div, t3);
		},
		p(ctx, dirty) {
			if (dirty & /*warnings*/ 2 && t0_value !== (t0_value = /*warning*/ ctx[24].message + "")) set_data(t0, t0_value);
			if (dirty & /*warnings*/ 2 && t2_value !== (t2_value = /*warning*/ ctx[24].frame + "")) set_data(t2, t2_value);
		},
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

// (180:4) {#if play}
function create_if_block_1(ctx) {
	let viewer_1;
	let current;

	let viewer_1_props = {
		componentPath: /*viewComponent*/ ctx[5],
		contentPath: /*contentPath*/ ctx[6]
	};

	viewer_1 = new Viewer({ props: viewer_1_props });
	/*viewer_1_binding*/ ctx[22](viewer_1);

	return {
		c() {
			create_component(viewer_1.$$.fragment);
		},
		m(target, anchor) {
			mount_component(viewer_1, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const viewer_1_changes = {};
			if (dirty & /*viewComponent*/ 32) viewer_1_changes.componentPath = /*viewComponent*/ ctx[5];
			if (dirty & /*contentPath*/ 64) viewer_1_changes.contentPath = /*contentPath*/ ctx[6];
			viewer_1.$set(viewer_1_changes);
		},
		i(local) {
			if (current) return;
			transition_in(viewer_1.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(viewer_1.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			/*viewer_1_binding*/ ctx[22](null);
			destroy_component(viewer_1, detaching);
		}
	};
}

// (183:4) {#if properties}
function create_if_block(ctx) {
	let properties_1;
	let current;

	properties_1 = new Properties({
			props: {
				componentPath: /*viewComponent*/ ctx[5],
				contentPath: /*contentPath*/ ctx[6],
				hasGit: /*hasGit*/ ctx[12]
			}
		});

	return {
		c() {
			create_component(properties_1.$$.fragment);
		},
		m(target, anchor) {
			mount_component(properties_1, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const properties_1_changes = {};
			if (dirty & /*viewComponent*/ 32) properties_1_changes.componentPath = /*viewComponent*/ ctx[5];
			if (dirty & /*contentPath*/ 64) properties_1_changes.contentPath = /*contentPath*/ ctx[6];
			if (dirty & /*hasGit*/ 4096) properties_1_changes.hasGit = /*hasGit*/ ctx[12];
			properties_1.$set(properties_1_changes);
		},
		i(local) {
			if (current) return;
			transition_in(properties_1.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(properties_1.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(properties_1, detaching);
		}
	};
}

function create_fragment(ctx) {
	let link;
	let t0;
	let header;
	let img;
	let img_src_value;
	let t1;
	let ul;
	let li0;
	let afbutton0;
	let t2;
	let t3;
	let t4;
	let li1;
	let afbutton1;
	let t5;
	let main;
	let toolbar;
	let t6;
	let t7;
	let div1;
	let t8;
	let div0;
	let codemirroreditor;
	let t9;
	let div1_class_value;
	let t10;
	let t11;
	let current;

	afbutton0 = new AFButton({
			props: {
				kind: "primary",
				aspect: "basic",
				icon: "check",
				size: "small",
				$$slots: { default: [create_default_slot_4] },
				$$scope: { ctx }
			}
		});

	afbutton0.$on("click", /*triggerSave*/ ctx[16]);
	let if_block0 = /*type*/ ctx[2] !== "Directory" && /*play*/ ctx[7] && create_if_block_7(ctx);
	let if_block1 = /*type*/ ctx[2] !== "Directory" && create_if_block_6(ctx);

	afbutton1 = new AFButton({
			props: {
				kind: "primary",
				aspect: "basic",
				icon: "info",
				size: "small",
				active: /*properties*/ ctx[8],
				$$slots: { default: [create_default_slot_1] },
				$$scope: { ctx }
			}
		});

	afbutton1.$on("click", /*toggleProperties*/ ctx[15]);
	toolbar = new Toolbar({});
	let if_block2 = /*$showNavigation*/ ctx[13] && create_if_block_5(ctx);
	let if_block3 = /*type*/ ctx[2] === "Directory" && /*mode*/ ctx[11] === "add" && create_if_block_4(ctx);
	let codemirroreditor_props = { content: /*_content*/ ctx[4] };
	codemirroreditor = new CodeMirrorEditor({ props: codemirroreditor_props });
	/*codemirroreditor_binding*/ ctx[21](codemirroreditor);
	codemirroreditor.$on("save", /*save*/ ctx[17]);
	let if_block4 = /*hasError*/ ctx[3] && create_if_block_2(ctx);
	let if_block5 = /*play*/ ctx[7] && create_if_block_1(ctx);
	let if_block6 = /*properties*/ ctx[8] && create_if_block(ctx);

	return {
		c() {
			link = element("link");
			t0 = space();
			header = element("header");
			img = element("img");
			t1 = space();
			ul = element("ul");
			li0 = element("li");
			create_component(afbutton0.$$.fragment);
			t2 = space();
			if (if_block0) if_block0.c();
			t3 = space();
			if (if_block1) if_block1.c();
			t4 = space();
			li1 = element("li");
			create_component(afbutton1.$$.fragment);
			t5 = space();
			main = element("main");
			create_component(toolbar.$$.fragment);
			t6 = space();
			if (if_block2) if_block2.c();
			t7 = space();
			div1 = element("div");
			if (if_block3) if_block3.c();
			t8 = space();
			div0 = element("div");
			create_component(codemirroreditor.$$.fragment);
			t9 = space();
			if (if_block4) if_block4.c();
			t10 = space();
			if (if_block5) if_block5.c();
			t11 = space();
			if (if_block6) if_block6.c();
			attr(link, "rel", "stylesheet");
			attr(link, "href", "/~/abfab/pastanaga/pastanaga.css");
			if (img.src !== (img_src_value = "/~/abfab/abfab.svg")) attr(img, "src", img_src_value);
			attr(img, "alt", "AbFab logo");
			attr(img, "class", "svelte-1y2xwr4");
			attr(ul, "class", "svelte-1y2xwr4");
			attr(header, "class", "svelte-1y2xwr4");
			attr(div0, "class", "editor svelte-1y2xwr4");
			attr(div1, "class", div1_class_value = "editor-container " + (/*play*/ ctx[7] || /*properties*/ ctx[8] ? "half" : "") + " svelte-1y2xwr4");
			toggle_class(div1, "with-nav", /*$showNavigation*/ ctx[13]);
			toggle_class(div1, "has-error", /*hasError*/ ctx[3]);
			attr(main, "class", "svelte-1y2xwr4");
		},
		m(target, anchor) {
			append(document.head, link);
			insert(target, t0, anchor);
			insert(target, header, anchor);
			append(header, img);
			append(header, t1);
			append(header, ul);
			append(ul, li0);
			mount_component(afbutton0, li0, null);
			append(ul, t2);
			if (if_block0) if_block0.m(ul, null);
			append(ul, t3);
			if (if_block1) if_block1.m(ul, null);
			append(ul, t4);
			append(ul, li1);
			mount_component(afbutton1, li1, null);
			insert(target, t5, anchor);
			insert(target, main, anchor);
			mount_component(toolbar, main, null);
			append(main, t6);
			if (if_block2) if_block2.m(main, null);
			append(main, t7);
			append(main, div1);
			if (if_block3) if_block3.m(div1, null);
			append(div1, t8);
			append(div1, div0);
			mount_component(codemirroreditor, div0, null);
			append(div1, t9);
			if (if_block4) if_block4.m(div1, null);
			append(main, t10);
			if (if_block5) if_block5.m(main, null);
			append(main, t11);
			if (if_block6) if_block6.m(main, null);
			current = true;
		},
		p(ctx, [dirty]) {
			const afbutton0_changes = {};

			if (dirty & /*$$scope*/ 134217728) {
				afbutton0_changes.$$scope = { dirty, ctx };
			}

			afbutton0.$set(afbutton0_changes);

			if (/*type*/ ctx[2] !== "Directory" && /*play*/ ctx[7]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty & /*type, play*/ 132) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_7(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(ul, t3);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			if (/*type*/ ctx[2] !== "Directory") {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty & /*type*/ 4) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block_6(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(ul, t4);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}

			const afbutton1_changes = {};
			if (dirty & /*properties*/ 256) afbutton1_changes.active = /*properties*/ ctx[8];

			if (dirty & /*$$scope*/ 134217728) {
				afbutton1_changes.$$scope = { dirty, ctx };
			}

			afbutton1.$set(afbutton1_changes);

			if (/*$showNavigation*/ ctx[13]) {
				if (if_block2) {
					if (dirty & /*$showNavigation*/ 8192) {
						transition_in(if_block2, 1);
					}
				} else {
					if_block2 = create_if_block_5(ctx);
					if_block2.c();
					transition_in(if_block2, 1);
					if_block2.m(main, t7);
				}
			} else if (if_block2) {
				group_outros();

				transition_out(if_block2, 1, 1, () => {
					if_block2 = null;
				});

				check_outros();
			}

			if (/*type*/ ctx[2] === "Directory" && /*mode*/ ctx[11] === "add") {
				if (if_block3) {
					if (dirty & /*type, mode*/ 2052) {
						transition_in(if_block3, 1);
					}
				} else {
					if_block3 = create_if_block_4(ctx);
					if_block3.c();
					transition_in(if_block3, 1);
					if_block3.m(div1, t8);
				}
			} else if (if_block3) {
				group_outros();

				transition_out(if_block3, 1, 1, () => {
					if_block3 = null;
				});

				check_outros();
			}

			const codemirroreditor_changes = {};
			if (dirty & /*_content*/ 16) codemirroreditor_changes.content = /*_content*/ ctx[4];
			codemirroreditor.$set(codemirroreditor_changes);

			if (/*hasError*/ ctx[3]) {
				if (if_block4) {
					if_block4.p(ctx, dirty);

					if (dirty & /*hasError*/ 8) {
						transition_in(if_block4, 1);
					}
				} else {
					if_block4 = create_if_block_2(ctx);
					if_block4.c();
					transition_in(if_block4, 1);
					if_block4.m(div1, null);
				}
			} else if (if_block4) {
				group_outros();

				transition_out(if_block4, 1, 1, () => {
					if_block4 = null;
				});

				check_outros();
			}

			if (!current || dirty & /*play, properties*/ 384 && div1_class_value !== (div1_class_value = "editor-container " + (/*play*/ ctx[7] || /*properties*/ ctx[8] ? "half" : "") + " svelte-1y2xwr4")) {
				attr(div1, "class", div1_class_value);
			}

			if (dirty & /*play, properties, $showNavigation*/ 8576) {
				toggle_class(div1, "with-nav", /*$showNavigation*/ ctx[13]);
			}

			if (dirty & /*play, properties, hasError*/ 392) {
				toggle_class(div1, "has-error", /*hasError*/ ctx[3]);
			}

			if (/*play*/ ctx[7]) {
				if (if_block5) {
					if_block5.p(ctx, dirty);

					if (dirty & /*play*/ 128) {
						transition_in(if_block5, 1);
					}
				} else {
					if_block5 = create_if_block_1(ctx);
					if_block5.c();
					transition_in(if_block5, 1);
					if_block5.m(main, t11);
				}
			} else if (if_block5) {
				group_outros();

				transition_out(if_block5, 1, 1, () => {
					if_block5 = null;
				});

				check_outros();
			}

			if (/*properties*/ ctx[8]) {
				if (if_block6) {
					if_block6.p(ctx, dirty);

					if (dirty & /*properties*/ 256) {
						transition_in(if_block6, 1);
					}
				} else {
					if_block6 = create_if_block(ctx);
					if_block6.c();
					transition_in(if_block6, 1);
					if_block6.m(main, null);
				}
			} else if (if_block6) {
				group_outros();

				transition_out(if_block6, 1, 1, () => {
					if_block6 = null;
				});

				check_outros();
			}
		},
		i(local) {
			if (current) return;
			transition_in(afbutton0.$$.fragment, local);
			transition_in(if_block0);
			transition_in(if_block1);
			transition_in(afbutton1.$$.fragment, local);
			transition_in(toolbar.$$.fragment, local);
			transition_in(if_block2);
			transition_in(if_block3);
			transition_in(codemirroreditor.$$.fragment, local);
			transition_in(if_block4);
			transition_in(if_block5);
			transition_in(if_block6);
			current = true;
		},
		o(local) {
			transition_out(afbutton0.$$.fragment, local);
			transition_out(if_block0);
			transition_out(if_block1);
			transition_out(afbutton1.$$.fragment, local);
			transition_out(toolbar.$$.fragment, local);
			transition_out(if_block2);
			transition_out(if_block3);
			transition_out(codemirroreditor.$$.fragment, local);
			transition_out(if_block4);
			transition_out(if_block5);
			transition_out(if_block6);
			current = false;
		},
		d(detaching) {
			detach(link);
			if (detaching) detach(t0);
			if (detaching) detach(header);
			destroy_component(afbutton0);
			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
			destroy_component(afbutton1);
			if (detaching) detach(t5);
			if (detaching) detach(main);
			destroy_component(toolbar);
			if (if_block2) if_block2.d();
			if (if_block3) if_block3.d();
			/*codemirroreditor_binding*/ ctx[21](null);
			destroy_component(codemirroreditor);
			if (if_block4) if_block4.d();
			if (if_block5) if_block5.d();
			if (if_block6) if_block6.d();
		}
	};
}

function updateErrors() {
	window.dispatchEvent(new Event("resize"));
}

function instance($$self, $$props, $$invalidate) {
	let hasError;
	let $showNavigation;
	component_subscribe($$self, showNavigation, $$value => $$invalidate(13, $showNavigation = $$value));
	let { content } = $$props;
	let _content = "";
	let error;
	let warnings = [];
	let type;
	let viewComponent;
	let contentPath;
	let play = false;
	let properties = false;
	let viewer;
	let codemirror;
	let mode = "edit";
	let hasGit = false;
	const subscriptions = [];
	subscriptions.push(derived(AbFabStore, state => state.query).subscribe(query => $$invalidate(11, mode = new URLSearchParams(query).get("mode") || "edit")));
	subscriptions.push(derived(AbFabStore, state => state.path).subscribe(() => $$invalidate(8, properties = false)));

	function togglePlay() {
		$$invalidate(7, play = !play);
		$$invalidate(8, properties = false);
		window.dispatchEvent(new Event("resize"));
	}

	function toggleProperties() {
		$$invalidate(8, properties = !properties);
		$$invalidate(7, play = false);
		window.dispatchEvent(new Event("resize"));
	}

	function triggerSave() {
		if (codemirror) {
			codemirror.saveFile();
		}
	}

	async function save(event) {
		const source = event.detail;
		const pathname = location.pathname.replace("/~/", "/").replace("/@edit", "");
		const result = await saveFile(pathname, type, source);
		$$invalidate(0, error = result.error);
		$$invalidate(1, warnings = result.warnings);
		updateErrors();

		if (!error) {
			refreshViewer();
		}
	}

	function discardErrors() {
		$$invalidate(0, error = undefined);
		$$invalidate(1, warnings = []);
		updateErrors();
	}

	function refreshViewer() {
		if (viewer) {
			viewer.refresh();
		}
	}

	onMount(() => {
		console.log(`Wheels on fire,\nRolling down the road.\nBest notify my next of kin\nThis wheel shall explode!\n\n`);
		loadTree();
	});

	subscriptions.push(derived(AbFabStore, state => state.logged).subscribe(isLogged => {
		if (!isLogged) {
			redirectToLogin();
		}
	}));

	onDestroy(() => subscriptions.map(unsubscribe => unsubscribe()));

	function codemirroreditor_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			codemirror = $$value;
			$$invalidate(10, codemirror);
		});
	}

	function viewer_1_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			viewer = $$value;
			$$invalidate(9, viewer);
		});
	}

	$$self.$$set = $$props => {
		if ("content" in $$props) $$invalidate(20, content = $$props.content);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*content, type*/ 1048580) {
			$: {
				const currentPath = location.pathname.replace("/@edit", "");
				let obj;

				try {
					obj = JSON.parse(content);
					$$invalidate(2, type = obj.type_name);
					$$invalidate(5, viewComponent = obj.view);
				} catch(e) {
					$$invalidate(2, type = "File");
					$$invalidate(6, contentPath = "");
				}

				if (type === "File") {
					$$invalidate(4, _content = content);
					$$invalidate(5, viewComponent = currentPath);
				} else if (type === "Content" || type === "Directory") {
					$$invalidate(4, _content = JSON.stringify(obj.data || {}));
					$$invalidate(6, contentPath = currentPath);
					$$invalidate(12, hasGit = type === "Directory" && obj.data && obj.data.hasGit);
				}
			}
		}

		if ($$self.$$.dirty & /*error, warnings*/ 3) {
			$: $$invalidate(3, hasError = !!error || warnings.length > 0);
		}

		if ($$self.$$.dirty & /*hasError*/ 8) {
			$: if (hasError) {
				updateErrors();
			}
		}
	};

	return [
		error,
		warnings,
		type,
		hasError,
		_content,
		viewComponent,
		contentPath,
		play,
		properties,
		viewer,
		codemirror,
		mode,
		hasGit,
		$showNavigation,
		togglePlay,
		toggleProperties,
		triggerSave,
		save,
		discardErrors,
		refreshViewer,
		content,
		codemirroreditor_binding,
		viewer_1_binding
	];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-1y2xwr4-style")) add_css();
		init(this, options, instance, create_fragment, safe_not_equal, { content: 20 });
	}
}

export default Component;