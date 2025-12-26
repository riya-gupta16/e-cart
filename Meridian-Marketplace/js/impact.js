document.addEventListener('DOMContentLoaded', () => {

    // --- Data Processing Functions (makes the charts dynamic) ---
    const countByProperty = (data, key) => {
        const counts = {};
        data.forEach(item => {
            const value = item[key] ? item[key].toLowerCase() : 'unknown';
            if (value) {
                counts[value] = (counts[value] || 0) + 1;
            }
        });
        return counts;
    };

    const productsData = products;

    // --- Data for Visualizations ---

    // 1. Artisans Supported (Pie Chart) - Dynamic Data
    const genderCounts = countByProperty(productsData, 'gender');
    const artisanData = {
        labels: ['Women', 'Men'],
        datasets: [{
            label: 'Artisans Supported',
            data: [genderCounts.women, genderCounts.men],
            backgroundColor: [
                '#B87B5B',
                '#6A9362'
            ],
            hoverOffset: 4
        }]
    };

    // 2. Products by Region (Bar Chart) - Dynamic Data
    const regionCounts = countByProperty(productsData, 'region');
    const regionLabels = Object.keys(regionCounts);
    const regionValues = Object.values(regionCounts);
    const regionColors = regionLabels.map((_, index) => {
        const colors = ['#B87B5B', '#6A9362', '#5C77A2', '#B5869B', '#4D4E62', '#C69C6D', '#7B94B5'];
        return colors[index % colors.length];
    });
    const regionData = {
        labels: regionLabels,
        datasets: [{
            label: 'Number of Products',
            data: regionValues,
            backgroundColor: regionColors,
            borderColor: regionColors.map(color => color),
            borderWidth: 1
        }]
    };

    // 3. Sustainability Metrics (Bar Chart) - Now Dynamic
    const sustainableMaterials = ['cotton', 'wood', 'herbs', 'textiles', 'organic', 'jute'];
    const sustainableCounts = productsData.filter(p => p.material && sustainableMaterials.includes(p.material.toLowerCase())).length;
    const fairTradeCount = productsData.filter(p => p.isFairTrade).length;
    const carbonNeutralCount = productsData.filter(p => p.isCarbonNeutral).length;
    
    const sustainabilityData = {
        labels: ['Sustainable Materials', 'Fair Trade Certified', 'Carbon Neutral'],
        datasets: [{
            label: 'Number of Products',
            data: [sustainableCounts, fairTradeCount, carbonNeutralCount],
            backgroundColor: [
                '#B87B5B',
                '#6A9362',
                '#5C77A2'
            ],
            borderColor: [
                '#A56A4A',
                '#55784E',
                '#4A608F'
            ],
            borderWidth: 1
        }]
    };

    // 4. Products by Material (Doughnut Chart) - Dynamic Data
    const materialCounts = countByProperty(productsData, 'material');
    const materialData = {
        labels: Object.keys(materialCounts),
        datasets: [{
            label: 'Products by Material',
            data: Object.values(materialCounts),
            backgroundColor: [
                '#B87B5B',
                '#6A9362',
                '#5C77A2',
                '#B5869B',
                '#4D4E62'
            ],
            hoverOffset: 4
        }]
    };

    // --- NEW CHART 1: Sustainability Metrics (Pie Chart) - Dynamic Data
    const sustainabilityMetricsCounts = countByProperty(productsData, 'sustainabilityMetric');
    const sustainabilityMetricsData = {
        labels: Object.keys(sustainabilityMetricsCounts),
        datasets: [{
            label: 'Sustainability Metrics',
            data: Object.values(sustainabilityMetricsCounts),
            backgroundColor: [
                '#B87B5B',
                '#6A9362',
                '#5C77A2',
                '#B5869B'
            ],
            hoverOffset: 4
        }]
    };

    // --- NEW CHART 2: Fair Trade Products by Region (Bar Chart) - Dynamic Data
    const fairTradeByRegion = {};
    productsData.forEach(product => {
        if (product.isFairTrade) {
            const region = product.region;
            fairTradeByRegion[region] = (fairTradeByRegion[region] || 0) + 1;
        }
    });
    const fairTradeRegionalData = {
        labels: Object.keys(fairTradeByRegion),
        datasets: [{
            label: 'Fair Trade Products',
            data: Object.values(fairTradeByRegion),
            backgroundColor: '#B87B5B',
            borderColor: '#A56A4A',
            borderWidth: 1
        }]
    };

    // --- Chart Configurations and Rendering ---
    
    const artisanChartElement = document.getElementById('artisan-chart');
    const regionChartElement = document.getElementById('region-chart');
    const sustainabilityChartElement = document.getElementById('sustainability-chart');
    const materialChartElement = document.getElementById('material-chart');
    const sustainabilityMetricsElement = document.getElementById('sustainability-metrics-chart');
    const fairTradeChartElement = document.getElementById('fair-trade-chart');

    if (artisanChartElement) {
        new Chart(artisanChartElement, {
            type: 'pie', data: artisanData, options: { responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Artisans by Demographics' } } }
        });
    }
    if (regionChartElement) {
        new Chart(regionChartElement, {
            type: 'bar', data: regionData, options: { responsive: true, plugins: { legend: { display: false } } }
        });
    }
    if (sustainabilityChartElement) {
        new Chart(sustainabilityChartElement, {
            type: 'bar', data: sustainabilityData, options: { responsive: true, plugins: { legend: { display: false }, tooltip: { callbacks: { label: (context) => context.parsed.y + ' products' } } } }
        });
    }
    if (materialChartElement) {
        new Chart(materialChartElement, {
            type: 'doughnut', data: materialData, options: { responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Products by Material' } } }
        });
    }

    // New Chart Renderings
    if (sustainabilityMetricsElement) {
        new Chart(sustainabilityMetricsElement, {
            type: 'pie', data: sustainabilityMetricsData, options: { responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Sustainability Metrics' } } }
        });
    }
    if (fairTradeChartElement) {
        new Chart(fairTradeChartElement, {
            type: 'bar', data: fairTradeRegionalData, options: { responsive: true, plugins: { legend: { display: false } } }
        });
    }
});