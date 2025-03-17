<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    public function index()
    {
        // Get statistics
        $statistics = [
            'totalProducts' => Product::count(),
            'totalSales' => Order::count(),
            'revenue' => Order::sum('total_amount'),
            'averageOrderValue' => Order::avg('total_amount') ?? 0,
        ];

        // Get top products
        $topProducts = Product::select('name', DB::raw('COUNT(order_items.id) as sales'), DB::raw('SUM(order_items.quantity * order_items.price) as revenue'))
            ->leftJoin('order_items', 'products.id', '=', 'order_items.product_id')
            ->groupBy('products.id', 'products.name')
            ->orderByDesc('sales')
            ->limit(5)
            ->get();

        // Get recent orders
        $recentOrders = Order::with(['items.product'])
            ->latest()
            ->limit(5)
            ->get()
            ->map(function ($order) {
                return [
                    'id' => '#' . str_pad($order->id, 3, '0', STR_PAD_LEFT),
                    'product' => $order->items->first()?->product->name ?? 'N/A',
                    'customer' => $order->customer_name,
                    'date' => $order->created_at->format('Y-m-d'),
                    'status' => $order->status,
                    'amount' => $order->total_amount,
                ];
            });

        return Inertia::render('Reports/Index', [
            'statistics' => $statistics,
            'topProducts' => $topProducts,
            'recentOrders' => $recentOrders,
        ]);
    }
} 