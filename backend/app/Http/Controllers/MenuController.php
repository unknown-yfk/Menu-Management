<?php
namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    public function index()
    {
        // Get all menus with children up to 4th depth
        $menus = Menu::where('depth', 0)->with('children.children.children.children')->get();
        return response()->json($menus);
    }

    public function show($id)
    {
        // Get specific menu with children up to 4th depth
        $menu = Menu::where('id', $id)->with('children.children.children.children')->first();
        return response()->json($menu);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'parent_id' => 'nullable|exists:menus,id',
        ]);

        $depth = $request->parent_id ? Menu::find($request->parent_id)->depth + 1 : 0;

        if ($depth > 4) {
            return response()->json(['error' => 'Cannot add more than 4 levels of depth'], 400);
        }

        $menu = Menu::create([
            'name' => $request->name,
            'parent_id' => $request->parent_id,
            'depth' => $depth,
        ]);

        return response()->json($menu, 201);
    }

    public function update(Request $request, $id)
    {
        $menu = Menu::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $menu->update($request->only('name'));

        return response()->json($menu);
    }

    public function destroy($id)
    {
        // Find the menu by ID
        $menu = Menu::findOrFail($id);
    
        // Recursive function to delete all children
        $this->deleteChildren($menu);
    
        // Delete the menu itself
        $menu->delete();
    
        // Return a success response
        return response()->json(['message' => 'Menu and its children deleted successfully']);
    }
    
    private function deleteChildren($menu)
    {
        foreach ($menu->children as $child) {
            // Recursively delete each child's children
            $this->deleteChildren($child);
    
            // Delete the child menu
            $child->delete();
        }
    }
    

    
}

