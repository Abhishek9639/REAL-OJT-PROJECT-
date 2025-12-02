 // Tab switching functionality
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs and contents
                document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding content
                tab.classList.add('active');
                const tabId = tab.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
        
        // Font loading simulation
        function simulateFontLoading(strategy, fontFamily, fontWeight) {
            const overlay = document.getElementById('loading-overlay');
            const previewText = document.getElementById('preview-text');
            const timeline = document.getElementById('timeline');
            
            // Reset preview
            previewText.style.fontFamily = 'system-ui, sans-serif';
            previewText.style.fontWeight = 'normal';
            
            // Show loading overlay for blocking strategy
            if (strategy === 'blocking') {
                overlay.classList.remove('hidden');
            }
            
            // Clear timeline
            timeline.innerHTML = '';
            
            // Add timeline events based on strategy
            let events = [];
            
            if (strategy === 'blocking') {
                events = [
                    { time: 0, label: 'Start', color: '#4361ee' },
                    { time: 300, label: 'Font Request', color: '#f72585' },
                    { time: 850, label: 'Font Loaded', color: '#4cc9f0' }
                ];
                
                // Update metrics for blocking
                document.getElementById('cls-value').textContent = '0.02';
                document.getElementById('cls-value').className = 'metric-value metric-good';
                document.getElementById('foit-value').textContent = '850ms';
                document.getElementById('foit-value').className = 'metric-value metric-bad';
                document.getElementById('fout-value').textContent = '0ms';
                document.getElementById('fout-value').className = 'metric-value metric-good';
                document.getElementById('load-value').textContent = '850ms';
                document.getElementById('load-value').className = 'metric-value metric-bad';
                
                // Generate CSS for blocking
                document.getElementById('generated-css').textContent = `@font-face {
    font-family: '${fontFamily}';
    font-style: normal;
    font-weight: ${fontWeight};
    src: url('fonts/${fontFamily.toLowerCase().replace(' ', '-')}-${fontWeight}.woff2') format('woff2');
    /* No font-display property - defaults to blocking behavior */
}

body {
    font-family: '${fontFamily}', sans-serif;
    font-weight: ${fontWeight};
}`;
            } else if (strategy === 'async') {
                events = [
                    { time: 0, label: 'Start', color: '#4361ee' },
                    { time: 100, label: 'Fallback Shown', color: '#4cc9f0' },
                    { time: 400, label: 'Font Request', color: '#f72585' },
                    { time: 900, label: 'Font Loaded', color: '#4cc9f0' }
                ];
                
                // Update metrics for async
                document.getElementById('cls-value').textContent = '0.08';
                document.getElementById('cls-value').className = 'metric-value metric-warning';
                document.getElementById('foit-value').textContent = '0ms';
                document.getElementById('foit-value').className = 'metric-value metric-good';
                document.getElementById('fout-value').textContent = '800ms';
                document.getElementById('fout-value').className = 'metric-value metric-bad';
                document.getElementById('load-value').textContent = '900ms';
                document.getElementById('load-value').className = 'metric-value metric-bad';
                
                // Generate CSS for async
                document.getElementById('generated-css').textContent = `@font-face {
    font-family: '${fontFamily}';
    font-style: normal;
    font-weight: ${fontWeight};
    src: url('fonts/${fontFamily.toLowerCase().replace(' ', '-')}-${fontWeight}.woff2') format('woff2');
    font-display: optional; /* Fallback shown immediately, swap only if font loads quickly */
}

body {
    font-family: '${fontFamily}', sans-serif;
    font-weight: ${fontWeight};
}`;
            } else if (strategy === 'swap') {
                events = [
                    { time: 0, label: 'Start', color: '#4361ee' },
                    { time: 50, label: 'Fallback Shown', color: '#4cc9f0' },
                    { time: 300, label: 'Font Request', color: '#f72585' },
                    { time: 750, label: 'Font Loaded', color: '#4cc9f0' }
                ];
                
                // Update metrics for swap
                document.getElementById('cls-value').textContent = '0.12';
                document.getElementById('cls-value').className = 'metric-value metric-bad';
                document.getElementById('foit-value').textContent = '0ms';
                document.getElementById('foit-value').className = 'metric-value metric-good';
                document.getElementById('fout-value').textContent = '700ms';
                document.getElementById('fout-value').className = 'metric-value metric-bad';
                document.getElementById('load-value').textContent = '750ms';
                document.getElementById('load-value').className = 'metric-value metric-warning';
                
                // Generate CSS for swap
                document.getElementById('generated-css').textContent = `@font-face {
    font-family: '${fontFamily}';
    font-style: normal;
    font-weight: ${fontWeight};
    src: url('fonts/${fontFamily.toLowerCase().replace(' ', '-')}-${fontWeight}.woff2') format('woff2');
    font-display: swap; /* Fallback shown immediately, then swaps when font loads */
}

body {
    font-family: '${fontFamily}', sans-serif;
    font-weight: ${fontWeight};
}`;
            } else if (strategy === 'preload') {
                events = [
                    { time: 0, label: 'Start', color: '#4361ee' },
                    { time: 50, label: 'Preload Initiated', color: '#f72585' },
                    { time: 400, label: 'Font Loaded', color: '#4cc9f0' }
                ];
                
                // Update metrics for preload
                document.getElementById('cls-value').textContent = '0.01';
                document.getElementById('cls-value').className = 'metric-value metric-good';
                document.getElementById('foit-value').textContent = '400ms';
                document.getElementById('foit-value').className = 'metric-value metric-warning';
                document.getElementById('fout-value').textContent = '0ms';
                document.getElementById('fout-value').className = 'metric-value metric-good';
                document.getElementById('load-value').textContent = '400ms';
                document.getElementById('load-value').className = 'metric-value metric-good';
                
                // Generate CSS for preload
                document.getElementById('generated-css').textContent = `/* Preload the font in HTML */
<link rel="preload" href="fonts/${fontFamily.toLowerCase().replace(' ', '-')}-${fontWeight}.woff2" as="font" type="font/woff2" crossorigin>

@font-face {
    font-family: '${fontFamily}';
    font-style: normal;
    font-weight: ${fontWeight};
    src: url('fonts/${fontFamily.toLowerCase().replace(' ', '-')}-${fontWeight}.woff2') format('woff2');
    font-display: block; /* Browser may block text rendering for a short period */
}

body {
    font-family: '${fontFamily}', sans-serif;
    font-weight: ${fontWeight};
}`;
            }
            
            // Render timeline events
            events.forEach(event => {
                const eventElement = document.createElement('div');
                eventElement.className = 'timeline-event';
                eventElement.style.left = `${(event.time / 1000) * 100}%`;
                eventElement.style.backgroundColor = event.color;
                
                const labelElement = document.createElement('div');
                labelElement.className = 'timeline-label';
                labelElement.textContent = event.label;
                labelElement.style.left = `${(event.time / 1000) * 100}%`;
                labelElement.style.color = event.color;
                
                timeline.appendChild(eventElement);
                timeline.appendChild(labelElement);
            });
            
            // Simulate font loading with timeout
            setTimeout(() => {
                overlay.classList.add('hidden');
                previewText.style.fontFamily = `'${fontFamily}', sans-serif`;
                previewText.style.fontWeight = fontWeight;
            }, strategy === 'blocking' ? 850 : 
               strategy === 'async' ? 900 : 
               strategy === 'swap' ? 750 : 400);
        }
        
        // Apply strategy buttons
        document.getElementById('apply-blocking').addEventListener('click', () => {
            const fontFamily = document.getElementById('font-family').value;
            const fontWeight = document.getElementById('font-weight').value;
            simulateFontLoading('blocking', fontFamily, fontWeight);
        });
        
        document.getElementById('apply-async').addEventListener('click', () => {
            const fontFamily = document.getElementById('async-font-family').value;
            const fontWeight = document.getElementById('async-font-weight').value;
            simulateFontLoading('async', fontFamily, fontWeight);
        });
        
        document.getElementById('apply-swap').addEventListener('click', () => {
            const fontFamily = document.getElementById('swap-font-family').value;
            const fontWeight = document.getElementById('swap-font-weight').value;
            simulateFontLoading('swap', fontFamily, fontWeight);
        });
        
        document.getElementById('apply-preload').addEventListener('click', () => {
            const fontFamily = document.getElementById('preload-font-family').value;
            const fontWeight = document.getElementById('preload-font-weight').value;
            simulateFontLoading('preload', fontFamily, fontWeight);
        });
        
        // Export CSS functionality
        document.getElementById('export-css').addEventListener('click', () => {
            const css = document.getElementById('generated-css').textContent;
            const blob = new Blob([css], { type: 'text/css' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'font-optimization.css';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
        
        // Subset builder functionality
        document.getElementById('build-subset').addEventListener('click', () => {
            alert('Subset building functionality would connect to a font subsetting service in a real implementation.');
        });
        
        // Initialize with blocking strategy
        simulateFontLoading('blocking', 'Roboto', '400');