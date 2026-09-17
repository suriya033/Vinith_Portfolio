import React, { useEffect, useRef } from 'react';

export const HeroCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Particle / Neural Node definition
    const nodeCount = Math.min(Math.floor((width * height) / 12000), 65);
    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      pulse: number;
      pulseSpeed: number;
    }

    const nodes: Node[] = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      radius: Math.random() * 2.5 + 1.5,
      pulse: Math.random() * Math.PI,
      pulseSpeed: 0.02 + Math.random() * 0.03
    }));

    const render = () => {
      // Ease mouse
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Draw Connections (Synapses)
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];

        // Update positions
        nodeA.x += nodeA.vx;
        nodeA.y += nodeA.vy;
        nodeA.pulse += nodeA.pulseSpeed;

        // Bounce borders
        if (nodeA.x < 0 || nodeA.x > width) nodeA.vx *= -1;
        if (nodeA.y < 0 || nodeA.y > height) nodeA.vy *= -1;

        // Connect with mouse
        const mouseDist = Math.hypot(nodeA.x - mouse.x, nodeA.y - mouse.y);
        if (mouseDist < 160) {
          const alpha = (1 - mouseDist / 160) * 0.6;
          ctx.beginPath();
          ctx.moveTo(nodeA.x, nodeA.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Mouse push effect
          nodeA.x += (nodeA.x - mouse.x) * 0.005;
          nodeA.y += (nodeA.y - mouse.y) * 0.005;
        }

        // Connect with other nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const dist = Math.hypot(nodeA.x - nodeB.x, nodeA.y - nodeB.y);

          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.35;
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            
            // Gradient connection line
            const grad = ctx.createLinearGradient(nodeA.x, nodeA.y, nodeB.x, nodeB.y);
            grad.addColorStop(0, `rgba(6, 182, 212, ${alpha})`);
            grad.addColorStop(1, `rgba(139, 92, 246, ${alpha})`);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw Nodes
      nodes.forEach((node) => {
        const currentRadius = node.radius + Math.sin(node.pulse) * 0.8;
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#06b6d4';
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#06b6d4';
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};
