// place files you want to import through the `$lib` alias in this folder.

export function inview(node: HTMLElement) {
	const observer = new IntersectionObserver(
		([entry]) => {
			if (entry.isIntersecting) {
				node.classList.add('visible');
				observer.unobserve(node);
			}
		},
		{ threshold: 0.1 }
	);
	observer.observe(node);
	return { destroy: () => observer.disconnect() };
}

export function tilt(node: HTMLElement) {
	function handleMove(e: MouseEvent) {
		const rect = node.getBoundingClientRect();
		const x = (e.clientX - rect.left) / rect.width - 0.5;
		const y = (e.clientY - rect.top) / rect.height - 0.5;
		const rotateX = -(y * 16); // max ±8deg
		const rotateY = x * 16;
		node.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
		node.style.transition = 'transform 0.1s ease-out';
	}

	function handleLeave() {
		node.style.transform = '';
		node.style.transition = 'transform 0.4s ease-out';
	}

	node.addEventListener('mousemove', handleMove);
	node.addEventListener('mouseleave', handleLeave);

	return {
		destroy() {
			node.removeEventListener('mousemove', handleMove);
			node.removeEventListener('mouseleave', handleLeave);
		}
	};
}
